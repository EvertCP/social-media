"use client"

import React from "react"
import { Button } from "../../components/ui/button"
import { ProfileMenu } from "../../components/profile-menu"
import { cn } from "../../lib/utils"

interface TopNavProps {
  leftContent?: React.ReactNode
  rightContent?: React.ReactNode
  className?: string
}

export function TopNav({ 
  leftContent, 
  rightContent,
  className 
}: TopNavProps) {
  return (
    <header className={cn("bg-background border-b border-border px-6 py-4 flex items-center justify-between", className)}>
      <div className="flex items-center gap-4">
        {leftContent}
      </div>

      <div className="flex items-center gap-4">
        {rightContent || (
          <>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="h-4 w-4 mr-2"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Crear Post
            </Button>

            <Button variant="ghost" size="sm">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="h-5 w-5"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </Button>

            <ProfileMenu />
          </>
        )}
      </div>
    </header>
  )
}
