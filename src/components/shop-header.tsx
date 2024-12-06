import { Badge } from "@/components/ui/badge"
import { Star } from 'lucide-react'

export function ShopHeader() {
  return (
    <div className="flex items-start space-x-4 mb-8">
      <div className="w-24 h-24 bg-sky-400 rounded-lg flex items-center justify-center">
        <div className="text-white text-4xl font-bold">DC</div>
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-2">
          <Badge variant="secondary">Beverages</Badge>
          <Badge variant="secondary">Healthy Food</Badge>
          <Badge variant="secondary">Tea & Coffee</Badge>
        </div>
        <h1 className="text-2xl font-bold mb-2">Drop Coffee – Tipu Sultan</h1>
        <div className="flex items-center space-x-4 text-sm">
          <Badge>Top restaurant</Badge>
          <Badge variant="destructive">Free delivery</Badge>
          <span className="text-muted-foreground">Min. order Rs. 249</span>
        </div>
        <div className="flex items-center space-x-4 mt-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="ml-1 font-medium">4.9/5</span>
            <span className="text-muted-foreground ml-1">(5000+)</span>
          </div>
          <button className="text-primary hover:underline">See reviews</button>
          <button className="text-primary hover:underline">More info</button>
        </div>
      </div>
    </div>
  )
}

