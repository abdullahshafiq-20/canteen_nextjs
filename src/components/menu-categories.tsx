'use client'

import { Button } from "@/components/ui/button"

interface MenuCategoriesProps {
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

const categories = [
  "All",
  "Hot Coffee",
  "Cold Coffee",
  "Frappe",
  "Tea",
  "Snacks"
]

export function MenuCategories({ selectedCategory, onSelectCategory }: MenuCategoriesProps) {
  return (
    <div className="py-4 overflow-x-auto">
      <div className="flex space-x-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => onSelectCategory(category)}
            className="whitespace-nowrap"
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  )
}

