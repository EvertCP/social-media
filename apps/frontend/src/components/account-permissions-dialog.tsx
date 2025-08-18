"use client"

import * as React from "react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Check, Settings } from "../lib/mock-icons"

// Tipo para los permisos de una cuenta
type AccountPermission = {
  id: string
  name: string
  description: string
  enabled: boolean
}

// Tipo para las propiedades del componente
interface AccountPermissionsDialogProps {
  accountId: string
  accountName: string
  platform: string
  onUpdatePermissions: (accountId: string, permissions: AccountPermission[]) => void
}

export function AccountPermissionsDialog({
  accountId,
  accountName,
  platform,
  onUpdatePermissions
}: AccountPermissionsDialogProps) {
  // Estado para los permisos
  const [permissions, setPermissions] = React.useState<AccountPermission[]>([
    {
      id: "read_profile",
      name: "Leer perfil",
      description: "Permite leer información básica del perfil",
      enabled: true
    },
    {
      id: "read_posts",
      name: "Leer publicaciones",
      description: "Permite leer publicaciones y estadísticas",
      enabled: true
    },
    {
      id: "publish_posts",
      name: "Publicar contenido",
      description: "Permite crear y programar publicaciones",
      enabled: true
    },
    {
      id: "read_messages",
      name: "Leer mensajes",
      description: "Permite leer mensajes directos",
      enabled: false
    },
    {
      id: "send_messages",
      name: "Enviar mensajes",
      description: "Permite enviar mensajes directos",
      enabled: false
    },
    {
      id: "manage_comments",
      name: "Gestionar comentarios",
      description: "Permite responder y moderar comentarios",
      enabled: true
    }
  ])

  // Función para cambiar el estado de un permiso
  const togglePermission = (permissionId: string) => {
    setPermissions(permissions.map(permission => 
      permission.id === permissionId 
        ? { ...permission, enabled: !permission.enabled } 
        : permission
    ))
  }

  // Función para guardar los cambios
  const saveChanges = () => {
    onUpdatePermissions(accountId, permissions)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Permisos
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Permisos de cuenta: {accountName}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-4">
            Configura qué permisos tiene esta aplicación para interactuar con tu cuenta de {platform}.
          </p>
          <div className="space-y-4">
            {permissions.map((permission) => (
              <div 
                key={permission.id} 
                className="flex items-start justify-between"
              >
                <div>
                  <h4 className="text-sm font-medium">{permission.name}</h4>
                  <p className="text-xs text-muted-foreground">{permission.description}</p>
                </div>
                <Button
                  variant={permission.enabled ? "default" : "outline"}
                  size="sm"
                  onClick={() => togglePermission(permission.id)}
                >
                  {permission.enabled && <Check className="h-4 w-4 mr-2" />}
                  {permission.enabled ? "Activado" : "Desactivado"}
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button onClick={saveChanges}>
            Guardar cambios
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
