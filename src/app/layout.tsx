import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pushkar Sagar Madhuri — AI & ML Engineer",
  description: "Portfolio of Pushkar Sagar Madhuri — AI & ML Engineer pursuing dual degrees at IIT Jodhpur & JNTUH. Specializing in time-series forecasting, deep learning, and full-stack AI-powered web applications.",
  keywords: ["AI Engineer", "ML Engineer", "Machine Learning", "Python Developer", "React Developer", "Data Science", "IIT Jodhpur", "Portfolio", "LSTM", "Prophet"],
  authors: [{ name: "Pushkar Sagar Madhuri" }],
  openGraph: {
    title: "Pushkar Sagar Madhuri — AI & ML Engineer",
    description: "Building intelligent AI systems and full-stack applications that bring ML to life.",
    type: "website",
  },
};

import { NeuralBackground } from "@/components/three/NeuralBackground";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full scroll-smooth"
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&family=Syne:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-full flex flex-col antialiased relative"
        style={{ background: "#050508", color: "#F0F0F5" }}
      >
        <div className="fixed inset-0 pointer-events-none z-0">
          <NeuralBackground />
        </div>
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
