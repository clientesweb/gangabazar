import Link from "next/link"
import { Instagram } from "lucide-react"

const instagramPosts = [
  { id: 1, image: "/images/insta-1.webp" },
  { id: 2, image: "/images/insta-2.webp" },
  { id: 3, image: "/images/insta-3.webp" },
  { id: 4, image: "/images/insta-4.webp" },
  { id: 5, image: "/images/insta-5.webp" },
  { id: 6, image: "/images/insta-6.webp" },
]

export function InstagramSection() {
  return (
    <section className="bg-background px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <Instagram className="h-8 w-8 text-foreground" />
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Seguinos en <span className="text-primary">Instagram</span>
          </h2>
          <Link
            href="https://www.instagram.com/gangabazar_/"
            target="_blank"
            className="mt-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            @gangabazar_
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {instagramPosts.map((post) => (
            <Link
              key={post.id}
              href="https://www.instagram.com/gangabazar_/"
              target="_blank"
              className="group relative aspect-square overflow-hidden rounded-xl bg-muted"
            >
              <img
                src={post.image || "/placeholder.svg"}
                alt="Instagram post"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-foreground/0 transition-colors group-hover:bg-foreground/40">
                <Instagram className="h-6 w-6 text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
