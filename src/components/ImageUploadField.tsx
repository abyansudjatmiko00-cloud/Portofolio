"use client";

import { useState } from "react";

interface ImageUploadFieldProps {
  required?: boolean;
}

export default function ImageUploadField({
  required = true,
}: ImageUploadFieldProps) {
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      setFileName("");
      setFileSize("");
      return;
    }

    setFileName(file.name);

    const sizeInMB = file.size / (1024 * 1024);
    setFileSize(`${sizeInMB.toFixed(2)} MB`);
  }

  return (
    <label
      htmlFor="image"
      className="flex cursor-pointer items-center justify-between rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-5 transition-all hover:border-slate-950 hover:bg-white"
    >
      <div className="min-w-0">
        {fileName ? (
          <>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-green-600">
                ✓
              </span>

              <p className="truncate text-sm font-semibold text-slate-800">
                {fileName}
              </p>
            </div>

            <p className="mt-1 text-xs text-green-600">
              Image selected successfully · {fileSize}
            </p>
          </>
        ) : (
          <>
            <p className="text-sm font-semibold text-slate-800">
              Choose Image
            </p>

            <p className="mt-1 text-xs text-slate-400">
              PNG, JPG, WEBP · Max 5 MB
            </p>
          </>
        )}
      </div>

      <span className="ml-4 shrink-0 rounded-full bg-slate-950 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-white">
        {fileName ? "Change" : "Browse"}
      </span>

      <input
        id="image"
        name="image"
        type="file"
        accept="image/png,image/jpeg,image/webp"
        required={required}
        onChange={handleChange}
        className="hidden"
      />
    </label>
  );
}