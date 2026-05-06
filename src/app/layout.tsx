// src/app/layout.tsx
import '../styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lucy – Asesor de Imagen IA',
  description: 'Plataforma SaaS que brinda asesoría de estilo personalizada usando IA Gemini.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="min-h-screen bg-background text-white antialiased">
        {children}
      </body>
    </html>
  );
}
