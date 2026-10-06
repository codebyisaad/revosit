import { notFound } from "next/navigation";
import type { Metadata } from "next";

/**
 * Development-only area.
 *
 * Everything under /dev exists to exercise UI that is otherwise too transient
 * to look at — loading states on a static site being the obvious case. The
 * guard runs on the server, so these routes 404 in production even if the
 * build somehow included them, and they are marked noindex regardless.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function DevLayout({ children }: LayoutProps<"/dev">) {
  if (process.env.NODE_ENV === "production") notFound();
  return <>{children}</>;
}
