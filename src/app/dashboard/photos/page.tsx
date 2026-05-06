// src/app/dashboard/photos/page.tsx
"use client";

import { useState, useEffect } from "react";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Button } from "@/components/ui/Button";

interface Photo {
  id: string;
  imageUrl: string;
  createdAt: string;
}

export default function PhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/photos");
      if (res.ok) {
        const data = await res.json();
        setPhotos(data.photos);
      }
    } catch (err) {
      console.error("Error fetching photos", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/photos", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Error al subir imagen");

      const data = await res.json();
      setPhotos((prev) => [data.photo, ...prev]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Mis Fotos</h2>
        <div className="relative">
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
          />
          <label htmlFor="file-upload">
            <Button as="span" variant="primary" disabled={uploading} className="cursor-pointer">
              {uploading ? <LoadingSpinner size="sm" /> : "Subir Foto"}
            </Button>
          </label>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-500 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="py-20">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="group relative aspect-square rounded-2xl overflow-hidden border border-white/5 bg-surface">
              <img
                src={photo.imageUrl}
                alt="Foto de perfil"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-xs text-white/70">
                  {new Date(photo.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
          {photos.length === 0 && (
            <div className="col-span-full py-20 text-center text-white/40">
              Aún no has subido ninguna foto.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
