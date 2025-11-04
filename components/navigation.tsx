"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function Navigation() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "View Config" },
    { href: "/log", label: "Temperature Log Form" },
    { href: "/logs", label: "View Logs" },
  ]

  return (
    <nav className="border-b border-border/50 bg-card/50 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/50 flex items-center justify-center animate-pulse-glow">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight">
              DRONE<span className="text-primary">NOW</span>
            </span>
          </div>
          <div className="flex gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 uppercase tracking-wider",
                  pathname === link.href
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/50"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent hover:border-primary/30",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
