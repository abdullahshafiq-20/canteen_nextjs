"use client"
import { ShopHeader } from "../components/shop-header"
import { MenuCategories } from "../components/menu-categories"
import { ProductGrid } from "../components/product-grid"
import { Cart } from "../components/cart"
import { useState } from "react"
import { CartItem } from "../components/product-grid"

export default function ShopPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")

  const addToCart = (product: CartItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevItems, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productId)
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      }
      return prevItems.filter(item => item.id !== productId)
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="py-4">
          <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
            <li>
              <a href="#" className="hover:text-primary">
                Karachi
              </a>
            </li>
            <li></li>
            <li>
              <a href="#" className="hover:text-primary">
                Restaurant List
              </a>
            </li>
            <li></li>
            <li className="text-primary">Drop Coffee - Tipu Sultan</li>
          </ol>
        </nav>

        {/* Header and Categories take full width */}
        <ShopHeader />
        <MenuCategories 
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        
        {/* Mobile Cart (shows between categories and products) */}
        <div className="lg:hidden sticky top-0 z-10 -mx-4 px-4 py-2 bg-gray-50">
          <Cart 
            items={cartItems} 
            addToCart={addToCart} 
            removeFromCart={removeFromCart}
            isMobile={true}
          />
        </div>
        
        {/* Products and Desktop Cart grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ProductGrid 
              cartItems={cartItems} 
              setCartItems={setCartItems}
              selectedCategory={selectedCategory}
            />
          </div>
          {/* Desktop Cart (hidden on mobile) */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-4">
              <Cart 
                items={cartItems} 
                addToCart={addToCart} 
                removeFromCart={removeFromCart}
                isMobile={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

