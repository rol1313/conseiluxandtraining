"use client";

import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";

type Props = {
  value: string;
  onChange: (url: string) => void;
};

export default function ImageUpload({ value, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      onChange(data.url);
    } else {
      setError(data.error || "Erreur upload");
    }

    setUploading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Preview */}
      {value && (
        <div className="relative w-full h-48 rounded-xl overflow-hidden border border-gray-200">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Upload zone */}
      {!value && (
        <div
          onClick={() => inputRef.current?.click()}
          className="w-full h-48 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
        >
          {uploading ? (
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <ImageIcon className="w-10 h-10 text-gray-300" />
              <p className="text-sm text-text-gray">Cliquer pour uploader une image</p>
              <p className="text-xs text-gray-400">PNG, JPG, WebP — max 5MB</p>
            </>
          )}
        </div>
      )}

      {/* Bouton changer si image déjà uploadée */}
      {value && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm text-text-dark hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <Upload className="w-4 h-4" />
          {uploading ? "Upload en cours..." : "Changer l'image"}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}