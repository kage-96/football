// middleware.ts
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Supabaseクライアントを初期化（Cookieを同期させる）
  const supabase = createMiddlewareClient({ req, res });

  // セッションを一度取得してCookieを更新
  await supabase.auth.getSession();

  return res;
}
