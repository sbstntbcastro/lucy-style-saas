"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/Button";
import { LoadingSpinner } from "../../../components/ui/LoadingSpinner";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al registrar");
      }
      // Registro exitoso, redirigir al dashboard
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-background">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-surface p-8 rounded-xl shadow-card space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-primary mb-4">
          Crear Cuenta
        </h2>
        {error && (
          <p className="text-red-400 text-center" role="alert">
            {error}
          </p>
        )}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-white/80">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            className="w-full px-4 py-2 rounded-xl bg-background border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-white/80">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={6}
            className="w-full px-4 py-2 rounded-xl bg-background border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
          className="w-full h-12 flex items-center justify-center"
        >
          {loading ? <LoadingSpinner size="sm" /> : "Crear Cuenta"}
        </Button>
        <p className="text-center text-sm text-white/60">
          ¿Ya tienes cuenta?{' '}
          <a href="/auth/login" className="text-primary underline">
            Inicia sesión
          </a>
        </p>
      </form>
    </section>
  );
}
