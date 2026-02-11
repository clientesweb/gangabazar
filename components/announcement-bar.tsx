"use client"

import Link from "next/link"

export function AnnouncementBar() {
  const announcements = [
    { text: "A partir de $100.000 envios gratis CABA Y GBA", href: null },
    { text: "Seguinos en redes @gangabazar_", href: "https://www.instagram.com/gangabazar_" },
    { text: "Personalizamos cada producto con grabado laser", href: null },
  ]

  const repeated = [...announcements, ...announcements, ...announcements, ...announcements]

  return (
    <div className="bg-[#EDE8D0] overflow-hidden whitespace-nowrap">
      <div className="animate-marquee inline-flex items-center py-2.5">
        {repeated.map((item, index) => (
          <span key={index} className="inline-flex items-center">
            {index > 0 && (
              <span className="mx-5 text-[10px] text-[#C8AD7F]" aria-hidden="true">
                {"\u25CF"}
              </span>
            )}
            {item.href ? (
              <Link
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold tracking-wide text-[#4F4D46] underline decoration-[#C8AD7F] underline-offset-2 transition-colors hover:text-[#a89060] sm:text-sm"
              >
                {item.text}
              </Link>
            ) : (
              <span className="text-xs font-semibold tracking-wide text-[#4F4D46] sm:text-sm">
                {item.text}
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  )
}
