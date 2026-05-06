// src/app/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="bg-surface p-8 rounded-3xl border border-white/5 shadow-2xl">
        <h2 className="text-3xl font-bold mb-4">Bienvenido a Lucy</h2>
        <p className="text-white/70 text-lg leading-relaxed">
          Tu estudio personal de estilo está listo. Usa el menú lateral para chatear con nuestra IA, gestionar tus fotos o descubrir nuevos outfits.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface p-6 rounded-2xl border border-white/5 hover:border-primary/50 transition-colors">
          <h3 className="text-xl font-semibold mb-2">Chat IA</h3>
          <p className="text-sm text-white/60 mb-4">Pregunta cualquier duda sobre tu estilo actual.</p>
        </div>
        <div className="bg-surface p-6 rounded-2xl border border-white/5 hover:border-primary/50 transition-colors">
          <h3 className="text-xl font-semibold mb-2">Mis Fotos</h3>
          <p className="text-sm text-white/60 mb-4">Gestiona tu armario virtual y prueba nuevos looks.</p>
        </div>
        <div className="bg-surface p-6 rounded-2xl border border-white/5 hover:border-primary/50 transition-colors">
          <h3 className="text-xl font-semibold mb-2">Outfits</h3>
          <p className="text-sm text-white/60 mb-4">Tus combinaciones guardadas y recomendaciones.</p>
        </div>
      </div>
    </div>
  );
}
