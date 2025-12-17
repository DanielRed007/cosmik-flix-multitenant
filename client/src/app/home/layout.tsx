// app/(marketing)/layout.tsx (optional – if you want different background, no navbar, etc.)
import { ReactNode } from "react";

export default function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>; // no navbar/footer here
}