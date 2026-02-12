import { ProductCard } from "./product-card"
import type { Product } from "@/lib/products"
import { cn } from "@/lib/utils"

interface ProductGridProps {
  products: Product[]
  columns?: 2 | 3 | 4
}

export function ProductGrid({ products, columns = 4 }: ProductGridProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <div
      className={cn(
        "grid gap-6 lg:gap-8 min-w-0 w-full",
        gridCols[columns]
      )}
    >
      {products.map((product) => (
        <div key={product.id} className="min-w-0">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  )
}
