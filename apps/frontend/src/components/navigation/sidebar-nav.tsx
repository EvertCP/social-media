"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "../../lib/utils"

export interface SidebarItem {
  id: string
  label: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  href?: string
}

interface SidebarNavProps {
  items: SidebarItem[]
  className?: string
}

export function SidebarNav({ items, className }: SidebarNavProps) {
  const pathname = usePathname()
  const activeTab = pathname === "/" ? "dashboard" : pathname.substring(1)

  return (
    <div className={cn("w-64 bg-sidebar border-r border-sidebar-border flex flex-col", className)}>
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-xl font-bold text-sidebar-foreground">Social Media Manager</h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {items.map((item) => {
          const Icon = item.icon
          const href = item.href || (item.id === "dashboard" ? "/" : `/${item.id}`)
          const isActive = activeTab === item.id
          
          return (
            <Link
              key={item.id}
              href={href}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
