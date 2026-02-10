"use client"

export function AnnouncementBar() {
  const announcements = [
    "Personalizamos cada producto con grabado laser",
    "A partir de $100.000 envíos gratis CABA Y GBA",
    "Seguinos en redes @gangabazar_"
  ]

  const duplicatedAnnouncements = [...announcements, ...announcements, ...announcements, ...announcements]

  return (
    <div className="bg-[#1A1A1A] overflow-hidden whitespace-nowrap">
      <div className="animate-marquee inline-flex py-2.5">
        {duplicatedAnnouncements.map((text, index) => (
          <span key={index} className="mx-8 text-xs sm:text-sm font-semibold tracking-wide text-[#a89060]">
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}
