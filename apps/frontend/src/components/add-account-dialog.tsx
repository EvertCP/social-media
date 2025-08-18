"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Instagram, Twitter, Facebook, Linkedin, Youtube, TikTok, PlusCircle } from "@/lib/mock-icons"

// Tipo para las plataformas de redes sociales
type SocialPlatform = "instagram" | "twitter" | "facebook" | "linkedin" | "youtube" | "tiktok"

interface AddAccountDialogProps {
  onAddAccount: (platform: SocialPlatform, username: string, profileUrl: string) => void
}

export function AddAccountDialog({ onAddAccount }: AddAccountDialogProps) {
  const [open, setOpen] = useState(false)
  const [platform, setPlatform] = useState<SocialPlatform | "">("")
  const [username, setUsername] = useState("")
  const [profileUrl, setProfileUrl] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (platform && username && profileUrl) {
      onAddAccount(platform as SocialPlatform, username, profileUrl)
      resetForm()
      setOpen(false)
    }
  }

  const resetForm = () => {
    setPlatform("")
    setUsername("")
    setProfileUrl("")
  }

  const handlePlatformChange = (value: string) => {
    setPlatform(value as SocialPlatform)
    
    // Generar URL de perfil automáticamente basado en la plataforma y nombre de usuario
    if (username) {
      let url = ""
      switch (value) {
        case "instagram":
          url = `https://instagram.com/${username.replace('@', '')}`
          break
        case "twitter":
          url = `https://twitter.com/${username.replace('@', '')}`
          break
        case "facebook":
          url = `https://facebook.com/${username}`
          break
        case "linkedin":
          url = `https://linkedin.com/company/${username}`
          break
        case "youtube":
          url = `https://youtube.com/c/${username}`
          break
        case "tiktok":
          url = `https://tiktok.com/@${username.replace('@', '')}`
          break
      }
      setProfileUrl(url)
    }
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUsername(value)
    
    // Actualizar URL si ya hay una plataforma seleccionada
    if (platform) {
      let url = ""
      switch (platform) {
        case "instagram":
          url = `https://instagram.com/${value.replace('@', '')}`
          break
        case "twitter":
          url = `https://twitter.com/${value.replace('@', '')}`
          break
        case "facebook":
          url = `https://facebook.com/${value}`
          break
        case "linkedin":
          url = `https://linkedin.com/company/${value}`
          break
        case "youtube":
          url = `https://youtube.com/c/${value}`
          break
        case "tiktok":
          url = `https://tiktok.com/@${value.replace('@', '')}`
          break
      }
      setProfileUrl(url)
    }
  }

  // Función para obtener el icono según la plataforma
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return <Instagram className="h-5 w-5" />
      case "twitter":
        return <Twitter className="h-5 w-5" />
      case "facebook":
        return <Facebook className="h-5 w-5" />
      case "linkedin":
        return <Linkedin className="h-5 w-5" />
      case "youtube":
        return <Youtube className="h-5 w-5" />
      case "tiktok":
        return <TikTok className="h-5 w-5" />
      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Añadir nueva cuenta
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Añadir cuenta de red social</DialogTitle>
            <DialogDescription>
              Conecta una nueva cuenta de red social para gestionar tu contenido.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="platform">Plataforma</Label>
              <Select value={platform} onValueChange={handlePlatformChange} required>
                <SelectTrigger id="platform">
                  <SelectValue placeholder="Selecciona una plataforma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">
                    <div className="flex items-center">
                      <Instagram className="h-4 w-4 mr-2" />
                      Instagram
                    </div>
                  </SelectItem>
                  <SelectItem value="twitter">
                    <div className="flex items-center">
                      <Twitter className="h-4 w-4 mr-2" />
                      Twitter
                    </div>
                  </SelectItem>
                  <SelectItem value="facebook">
                    <div className="flex items-center">
                      <Facebook className="h-4 w-4 mr-2" />
                      Facebook
                    </div>
                  </SelectItem>
                  <SelectItem value="linkedin">
                    <div className="flex items-center">
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </div>
                  </SelectItem>
                  <SelectItem value="youtube">
                    <div className="flex items-center">
                      <Youtube className="h-4 w-4 mr-2" />
                      YouTube
                    </div>
                  </SelectItem>
                  <SelectItem value="tiktok">
                    <div className="flex items-center">
                      <TikTok className="h-4 w-4 mr-2" />
                      TikTok
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Nombre de usuario</Label>
              <Input
                id="username"
                value={username}
                onChange={handleUsernameChange}
                placeholder="@usuario o nombre de la página"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="profileUrl">URL del perfil</Label>
              <Input
                id="profileUrl"
                value={profileUrl}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfileUrl(e.target.value)}
                placeholder="https://..."
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Añadir cuenta</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
