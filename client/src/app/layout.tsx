import type { Metadata } from "next";
import "@fontsource-variable/space-grotesk";
import "./globals.css";

import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "SmartERP",
  description: "Modern ERP Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily:
            'Inter, "Space Grotesk Variable", system-ui, sans-serif',
        }}
      >
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
