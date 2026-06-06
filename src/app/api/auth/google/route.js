import { NextResponse } from "next/server";

export async function GET() {

  const clientId =
    process.env.GOOGLE_CLIENT_ID;

  const redirectUri =
    "http://localhost:3000/api/auth/google/callback";

  const scope =
    "openid email profile";

  const authUrl =
    `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&prompt=consent`;

  return NextResponse.redirect(authUrl);
}