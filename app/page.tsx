import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CategoriesSection } from "@/components/categories-section"
import { FeaturedProducts } from "@/components/featured-products"
import { NewArrivalsSection } from "@/components/new-arrivals-section"
import { StylingConsultationSection } from "@/components/styling-consultation-section"
import { EditorialSection } from "@/components/editorial-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { InstagramSection } from "@/components/instagram-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <CategoriesSection />
        <FeaturedProducts />
        <NewArrivalsSection />
        <StylingConsultationSection />
        <EditorialSection />
        <TestimonialsSection />
        <NewsletterSection />
        <InstagramSection />
      </main>
      <Footer />
    </div>
  )
}
