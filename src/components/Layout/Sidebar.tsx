"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Inicio" },
  { href: "/dashboard/chat", label: "Chat IA" },
  { href: "/dashboard/photos", label: "Fotos" },
  { href: "/dashboard/outfits", label: "Outfits" },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <aside className="h-screen w-64 bg-surface text-white flex flex-col p-6 shadow-card border-r border-white/5">
      <h2 className="text-2xl font-bold text-primary mb-8 tracking-tight">Lucy</h2>
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className={`block px-4 py-2 rounded-xl transition-colors hover:bg-white/5 ${
              pathname === item.href ? "bg-white/10 text-primary font-semibold" : "text-white/70"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      
      <div className="pt-6 border-t border-white/5">
        <button 
          onClick={handleLogout}
          className="w-full px-4 py-2 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-colors font-medium text-left flex items-center space-x-2"
        >
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
};
