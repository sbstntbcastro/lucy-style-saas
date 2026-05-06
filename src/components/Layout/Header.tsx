// src/components/Layout/Header.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";

interface User {
  email: string;
}

export const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };
    fetchUser();
  }, []);

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
    <header className="h-16 border-b border-white/10 bg-surface/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Lucy Style
        </h1>
      </div>
      
      <div className="flex items-center space-x-6">
        {user && (
          <div className="text-sm text-white/70">
            Conectado como: <span className="text-white font-medium">{user.email}</span>
          </div>
        )}
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={handleLogout}
          className="border-white/10 hover:bg-white/5"
        >
          Cerrar Sesión
        </Button>
      </div>
    </header>
  );
};
