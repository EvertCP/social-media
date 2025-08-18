# Configuración de Auth0 para la aplicación

Este documento proporciona instrucciones para configurar Auth0 en la aplicación frontend.

## Requisitos previos

1. Cuenta en [Auth0](https://auth0.com/)
2. Aplicación creada en el dashboard de Auth0

## Pasos para configurar Auth0

### 1. Crear una aplicación en Auth0

1. Inicia sesión en tu cuenta de Auth0
2. Ve a "Applications" > "Applications" en el menú lateral
3. Haz clic en "Create Application"
4. Asigna un nombre a tu aplicación (ej. "Social Media Manager")
5. Selecciona "Single Page Application" como tipo
6. Haz clic en "Create"

### 2. Configurar la aplicación en Auth0

1. En la pestaña "Settings" de tu aplicación:
   - Configura "Allowed Callback URLs": `http://localhost:3000, https://tu-dominio-de-produccion.com`
   - Configura "Allowed Logout URLs": `http://localhost:3000, https://tu-dominio-de-produccion.com`
   - Configura "Allowed Web Origins": `http://localhost:3000, https://tu-dominio-de-produccion.com`
   - Guarda los cambios

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto frontend con las siguientes variables:

```
NEXT_PUBLIC_AUTH0_DOMAIN=tu-tenant.region.auth0.com
NEXT_PUBLIC_AUTH0_CLIENT_ID=tu-client-id
```

Reemplaza:
- `tu-tenant.region.auth0.com` con el dominio de tu aplicación Auth0
- `tu-client-id` con el Client ID de tu aplicación Auth0

#### Ejemplo de archivo .env.local

A continuación se muestra un ejemplo de cómo debería verse tu archivo `.env.local`:

```
NEXT_PUBLIC_AUTH0_DOMAIN=dev-example.auth0.com
NEXT_PUBLIC_AUTH0_CLIENT_ID=a1b2c3d4e5f6g7h8i9j0
```

> **Nota**: Asegúrate de no compartir ni hacer commit de tu archivo `.env.local` en el repositorio, ya que contiene información sensible.

### 4. Reiniciar la aplicación

Después de configurar las variables de entorno, reinicia la aplicación para que los cambios surtan efecto:

```
npm run dev
```

## Verificación

Para verificar que Auth0 está correctamente configurado:

1. Abre la aplicación en el navegador
2. Haz clic en el avatar en la esquina superior derecha
3. Selecciona "Iniciar sesión" o "Registrarse"
4. Deberías ser redirigido a la página de autenticación de Auth0
5. Después de autenticarte, deberías volver a la aplicación con tu sesión iniciada

## Solución de problemas

Si encuentras problemas con la autenticación:

1. Verifica que las variables de entorno estén correctamente configuradas
2. Asegúrate de que las URLs de callback y logout estén correctamente configuradas en Auth0
3. Revisa la consola del navegador para ver si hay errores
4. Verifica que el dominio y el client ID sean correctos

## Recursos adicionales

- [Documentación de Auth0 React SDK](https://auth0.com/docs/quickstart/spa/react)
- [Documentación de Next.js con Auth0](https://auth0.com/blog/ultimate-guide-nextjs-authentication-auth0/)
