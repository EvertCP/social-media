"use client"

import React from "react"
import { Input } from "./input"
import { Search } from "../../lib/mock-icons"
import { cn } from "../../lib/utils"

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  icon?: React.ReactNode
}

export function SearchInput({ className, icon, ...props }: SearchInputProps) {
  return (
    <div className={cn("relative", className)}>
      <span className="absolute left-2.5 top-2.5 text-muted-foreground">
        {icon || <Search className="h-4 w-4" />}
      </span>
      <Input
        type="search"
        className={cn("pl-8", className)}
        placeholder="Buscar..."
        {...props}
      />
    </div>
  )
}
