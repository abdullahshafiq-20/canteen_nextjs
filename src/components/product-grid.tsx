import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import Image from 'next/image'

interface Product {
  id: number
  name: string
  price: string
  description: string
  image?: string
  category: string
}

export interface CartItem extends Product {
  quantity: number
}

interface ProductGridProps {
  cartItems: CartItem[]
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>
  selectedCategory: string
}

const products = [
  {
    id: 1,
    name: "Vanilla Bean Frappe",
    price: "Rs. 700",
    description: "This rich flavor of espresso blended with vanilla bean, milk and ice cream",
    image: "https://res.cloudinary.com/dkb1rdtmv/image/upload/v1733489363/Afghani-Biryani-1_hmp4cb.webp",
    category: "Frappe"
  },
  {
    id: 2,
    name: "Iced Spanish Latte",
    price: "Rs. 650",
    description: "Iced coffee drink made using milk, es-presso, condensed milk.",
    image: "https://res.cloudinary.com/dkb1rdtmv/image/upload/v1733489363/Afghani-Biryani-1_hmp4cb.webp",
    category: "Cold Coffee"
  },
  {
    id: 8,
    name: "Vanilla Bean Frappe",
    price: "Rs. 700",
    description: "This rich flavor of espresso blended with vanilla bean, milk and ice cream",
    image: "https://res.cloudinary.com/dkb1rdtmv/image/upload/v1733489363/Afghani-Biryani-1_hmp4cb.webp",
    category: "Frappe"
  }
]

export function ProductGrid({ cartItems, setCartItems, selectedCategory }: ProductGridProps) {
  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(product => {
        console.log(`Filtering: ${product.category} === ${selectedCategory}`);
        return product.category === selectedCategory;
      });

  const addToCart = (product: Product) => {
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

  const getItemQuantity = (productId: number) => {
    return cartItems.find(item => item.id === productId)?.quantity || 0
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {filteredProducts.map((product) => {
        const quantity = getItemQuantity(product.id)
        
        return (
          <Card key={product.id}>
            <CardContent className="p-4">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                  <p className="font-medium">{product.price}</p>
                </div>
                <div className="relative w-24 h-24">
                  <Image
                    src={product.image || '/placeholder.svg'}
                    alt={product.name}
                    width={96}
                    height={96}
                    className="rounded-lg object-cover"
                  />
                  {quantity === 0 ? (
                    <Button
                      size="icon"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full shadow-lg"
                      onClick={() => addToCart(product)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  ) : (
                    <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium shadow-lg">
                      {quantity}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

