"use client"

import React from "react"
import { SidebarNav, SidebarItem } from "./sidebar-nav"
import { TopNav } from "./top-nav"
import { cn } from "../../lib/utils"

interface NavigationProps {
  sidebarItems: SidebarItem[]
  leftTopContent?: React.ReactNode
  rightTopContent?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function Navigation({ 
  sidebarItems, 
  leftTopContent, 
  rightTopContent, 
  children,
  className
}: NavigationProps) {
  return (
    <div className={cn("flex h-screen bg-background", className)}>
      {/* Sidebar Navigation */}
      <SidebarNav items={sidebarItems} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation Bar */}
        <TopNav leftContent={leftTopContent} rightContent={rightTopContent} />

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
