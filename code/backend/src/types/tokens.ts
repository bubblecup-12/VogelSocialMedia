export interface JwtPayload {
  id: string;
  username: string;
  role: string;
  iat: number;
  exp: number;
  jti: string;
}

export interface RefreshTokenPayload {
  jti: string;
  iat: number;
  exp: number;
}
