"use client"

export function AnnouncementBar() {
  const announcements = [
    "Personalizamos cada producto con grabado laser",
    "Envios en el dia | San Martin, Bs. As.",
    "Pagas al recibir tu pedido",
    "Regalos personalizados para toda ocasion",
  ]

  const duplicatedAnnouncements = [...announcements, ...announcements, ...announcements, ...announcements]

  return (
    <div className="bg-[#1A1A1A] overflow-hidden whitespace-nowrap">
      <div className="animate-marquee inline-flex py-2.5">
        {duplicatedAnnouncements.map((text, index) => (
          <span key={index} className="mx-8 text-xs sm:text-sm font-semibold tracking-wide text-[#C8AD7F]">
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}
