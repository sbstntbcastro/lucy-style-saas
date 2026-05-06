// src/app/page.tsx
import Link from "next/link";
import { Button } from "../components/ui/Button";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-surface py-12">
      {/* Hero */}
      <div className="text-center max-w-2xl space-y-6">
        <h1 className="text-5xl font-bold text-primary drop-shadow-lg">
          Tu Asesor de Imagen IA
        </h1>
        <p className="text-xl text-white/80">
          Descubre outfits personalizados, mejora tu estilo y gana confianza con la ayuda de una IA experta.
        </p>
        <div className="flex justify-center space-x-4 mt-8">
          <Link href="/auth/register">
            <Button variant="primary" className="text-lg">
              Regístrate Gratis
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button variant="secondary" className="text-lg">
              Inicia Sesión
            </Button>
          </Link>
        </div>
      </div>

      {/* Benefits */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl px-4">
        <div className="p-6 bg-surface rounded-xl shadow-card text-center">
          <h3 className="text-2xl font-semibold mb-3 text-primary">Asesoría Personalizada</h3>
          <p className="text-white/70">
            La IA analiza tu cuerpo y estilo para sugerir outfits que realmente te favorezcan.
          </p>
        </div>
        <div className="p-6 bg-surface rounded-xl shadow-card text-center">
          <h3 className="text-2xl font-semibold mb-3 text-primary">Galería de Fotos</h3>
          <p className="text-white/70">
            Sube tus fotos y visualiza cómo quedarían los atuendos recomendados.
          </p>
        </div>
        <div className="p-6 bg-surface rounded-xl shadow-card text-center">
          <h3 className="text-2xl font-semibold mb-3 text-primary">Chat IA En Tiempo Real</h3>
          <p className="text-white/70">
            Conversa con un estilista virtual y obtén ideas al instante.
          </p>
        </div>
      </div>
    </section>
  );
}
