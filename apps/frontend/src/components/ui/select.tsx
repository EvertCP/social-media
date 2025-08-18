"use client"

import * as React from "react"
import { Check } from "../../lib/mock-icons"
import { cn } from "../../lib/utils"

interface SelectProps {
  value: string
  onValueChange: (value: string) => void
  children: React.ReactNode
  required?: boolean
}

const Select: React.FC<SelectProps> = ({ value, onValueChange, children, required }) => {
  const [open, setOpen] = React.useState(false)
  
  return (
    <div className="relative">
      {React.Children.map(children, child => {
        if (React.isValidElement(child) && child.type === SelectTrigger) {
          return React.cloneElement(child as React.ReactElement<any>, {
            onClick: () => setOpen(!open),
            value
          })
        }
        if (React.isValidElement(child) && child.type === SelectContent) {
          return open ? React.cloneElement(child as React.ReactElement<any>, {
            onSelect: (val: string) => {
              onValueChange(val)
              setOpen(false)
            },
            value
          }) : null
        }
        return child
      })}
    </div>
  )
}

interface SelectTriggerProps {
  className?: string
  children?: React.ReactNode
  id?: string
  value?: string
  onClick?: () => void
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, id, onClick }, ref) => (
    <button
      type="button"
      id={id}
      ref={ref}
      onClick={onClick}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    >
      {children}
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 opacity-50">
        <path d="m6 9 6 6 6-6"/>
      </svg>
    </button>
  )
)
SelectTrigger.displayName = "SelectTrigger"

interface SelectValueProps {
  placeholder?: string
}

const SelectValue: React.FC<SelectValueProps> = ({ placeholder }) => {
  return <span className="text-muted-foreground">{placeholder}</span>
}

interface SelectContentProps {
  className?: string
  children?: React.ReactNode
  onSelect?: (value: string) => void
  value?: string
}

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children, onSelect, value }, ref) => (
    <div
      ref={ref}
      className={cn(
        "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md",
        className
      )}
    >
      <div className="p-1">
        {React.Children.map(children, child => {
          if (React.isValidElement(child) && child.type === SelectItem) {
            return React.cloneElement(child as React.ReactElement<SelectItemProps>, {
              onSelect,
              isSelected: (child as React.ReactElement<SelectItemProps>).props.value === value
            })
          }
          return child
        })}
      </div>
    </div>
  )
)
SelectContent.displayName = "SelectContent"

interface SelectItemProps {
  className?: string
  children?: React.ReactNode
  value: string
  onSelect?: (value: string) => void
  isSelected?: boolean
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, children, value, onSelect, isSelected }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
        className
      )}
      onClick={() => onSelect?.(value)}
    >
      {isSelected && (
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <Check className="h-4 w-4" />
        </span>
      )}
      {children}
    </div>
  )
)
SelectItem.displayName = "SelectItem"

const SelectGroup: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return <div>{children}</div>
}

const SelectLabel: React.FC<{children: React.ReactNode, className?: string}> = ({ children, className }) => {
  return <div className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}>{children}</div>
}

const SelectSeparator: React.FC<{className?: string}> = ({ className }) => {
  return <div className={cn("-mx-1 my-1 h-px bg-muted", className)} />
}

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
}
