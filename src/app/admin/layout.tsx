'use client'
import { useRouteGuard } from "./_hooks/useRouteGuard";

export default function RootLayout() {

  useRouteGuard();
  return (
    <></>
  );
}
