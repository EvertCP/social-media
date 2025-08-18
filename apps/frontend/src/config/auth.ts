export const authConfig = {
  domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN || 'your-auth0-domain.auth0.com',
  clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || 'your-auth0-client-id',
  audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE || 'your-auth0-api-identifier',
  redirectUri: typeof window !== 'undefined' ? window.location.origin + '/dashboard' : 'http://localhost:3000/dashboard',
  scope: 'openid profile email',
};
