"use client"

import React from "react"
import { cn } from "../lib/utils"

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  className?: string
}

export function SearchInput({ icon, className, ...props }: SearchInputProps) {
  return (
    <div className={cn("relative", className)}>
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
          {icon}
        </div>
      )}
      <input
        type="text"
        className={cn(
          "pl-10 pr-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring w-full",
          !icon && "pl-4"
        )}
        {...props}
      />
    </div>
  )
}
