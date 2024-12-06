'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingBasket, Minus, Plus } from 'lucide-react'
import { CartItem } from "./product-grid"
import Image from 'next/image'

interface CartProps {
  items: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (productId: number) => void
  isMobile: boolean
}

export function Cart({ items, addToCart, removeFromCart, isMobile }: CartProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const total = items.reduce((sum, item) => {
    const price = parseInt(item.price.replace('Rs. ', ''))
    return sum + (price * item.quantity)
  }, 0)

  if (isMobile) {
    return (
      <div className="bg-white rounded-lg shadow">
        <button
          className="w-full p-4 flex items-center justify-between"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center space-x-2">
            <ShoppingBasket className="h-5 w-5" />
            <span className="font-semibold">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold">Rs. {total}</span>
            <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
              ▼
            </div>
          </div>
        </button>
        
        {isExpanded && (
          <div className="p-4 border-t">
            <div className="max-h-[60vh] overflow-y-auto">
              {items.length === 0 ? (
                <div className="py-8 text-center">
                  <ShoppingBasket className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Image
                          src={item.image || '/placeholder.svg'}
                          alt={item.name}
                          width={48}
                          height={48}
                          className="rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.price} x {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => addToCart(item)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Button className="w-full" disabled={items.length === 0}>
                Checkout
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Desktop version (existing cart layout)
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Your Cart</h2>
      <div className="min-h-[400px]">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center">
            <ShoppingBasket className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Image
                    src={item.image || '/placeholder.svg'}
                    alt={item.name}
                    width={48}
                    height={48}
                    className="rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.price} x {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8"
                    onClick={() => addToCart(item)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-6 pt-4 border-t">
        <div className="flex justify-between items-center mb-4">
          <p className="font-semibold">Total</p>
          <p className="font-semibold">Rs. {total}</p>
        </div>
        <Button className="w-full" disabled={items.length === 0}>
          Checkout
        </Button>
      </div>
    </div>
  )
}

