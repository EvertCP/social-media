"use client"

import { useAuth0 } from "@auth0/auth0-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { LogOut, User, Settings, UserPlus, LogIn } from "@/lib/mock-icons"

export function ProfileMenu() {
  const { user, isAuthenticated, loginWithRedirect, logout, isLoading } = useAuth0()
  
  // Extraer iniciales del nombre del usuario o usar un valor por defecto
  const getUserInitials = () => {
    if (!user?.name) return "JD"
    
    const nameParts = user.name.split(" ")
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
    }
    return nameParts[0].substring(0, 2).toUpperCase()
  }
  
  const userInitials = getUserInitials()
  const userImage = user?.picture || "/placeholder.svg?height=32&width=32"
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarImage src={userImage} alt="Foto de perfil" />
          <AvatarFallback>{userInitials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {isAuthenticated ? (
          <>
            <div className="px-2 py-1.5 text-sm font-medium">
              <p className="text-foreground">Mi Cuenta</p>
              <p className="text-muted-foreground text-xs">{user?.email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Configuración</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="cursor-pointer text-red-500 focus:text-red-500"
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar sesión</span>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={() => loginWithRedirect()}
            >
              <LogIn className="mr-2 h-4 w-4" />
              <span>Iniciar sesión</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={() => loginWithRedirect({ authorizationParams: { screen_hint: 'signup' } })}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              <span>Registrarse</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
