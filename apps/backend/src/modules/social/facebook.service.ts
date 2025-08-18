import { Injectable } from '@nestjs/common';
import { SocialService } from './social.service';
import { HttpService } from '@nestjs/axios';


@Injectable()
export class FacebookService {
  constructor(
    private readonly socialService: SocialService,
    private readonly httpService: HttpService,
  ) {}

  async getAuthUrl(): Promise<string> {
    const clientId = process.env.FACEBOOK_CLIENT_ID;
    const redirectUri = process.env.FACEBOOK_REDIRECT_URI;
    const scope = 'email,public_profile,pages_show_list,pages_read_engagement,pages_manage_posts,read_insights';
    
    return `https://www.facebook.com/v18.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&state=xyz123`;
  }

  async handleCallback(code: string, userId: string): Promise<any> {
    // En una implementación real, intercambiarías el código por un token de acceso
    // y guardarías la cuenta social en la base de datos
    
    // Simulación
    const clientId = process.env.FACEBOOK_CLIENT_ID;
    const clientSecret = process.env.FACEBOOK_CLIENT_SECRET;
    const redirectUri = process.env.FACEBOOK_REDIRECT_URI;

    // 1️⃣ Intercambiar code por access_token
    const tokenUrl = `https://graph.facebook.com/v18.0/oauth/access_token?client_id=${clientId}&redirect_uri=${redirectUri}&client_secret=${clientSecret}&code=${code}`;

    const tokenResponse = await this.httpService.axiosRef.get(tokenUrl);
    const accessToken = tokenResponse.data.access_token;

    // 2️⃣ Obtener info básica del usuario
    const userInfoUrl = `https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken}`;
    const userInfoResponse = await this.httpService.axiosRef.get(userInfoUrl);
    const userInfo = userInfoResponse.data;

    // 3️⃣ Guardar en la BD
    await this.socialService.create({
      platform: 'facebook',
      accountId: userInfo.id,
      username: userInfo.name,
      accessToken: accessToken,
      user: { id: userId } as any,
    });

    return userInfo;
  }
  async publishPost(pageId: string, pageAccessToken: string, content: string): Promise<any> {
    const url = `https://graph.facebook.com/${pageId}/feed`;
  
    const response = await this.httpService.axiosRef.post(url, null, {
      params: {
        message: content,
        access_token: pageAccessToken,
      },
    });
  
    return response.data; // Devuelve el ID del post creado
  }

  async getPageInsights(pageId: string, pageAccessToken: string): Promise<any> {
    const url = `https://graph.facebook.com/${pageId}/insights/page_fans_online_per_day?access_token=${pageAccessToken}`;
    const response = await this.httpService.axiosRef.get(url);
    return response.data;
  }
  
}