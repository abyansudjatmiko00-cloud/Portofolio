"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface SuccessToastProps {
  message: string;
}

export default function SuccessToast({
  message,
}: SuccessToastProps) {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted || !visible) {
    return null;
  }

  return createPortal(
    <div
      style={{
        position: "fixed",
        right: "24px",
        bottom: "24px",
        top: "auto",
        left: "auto",
        zIndex: 999999,
        width: "calc(100% - 48px)",
        maxWidth: "384px",
      }}
    >
      <div className="flex items-center gap-3 rounded-2xl border border-green-200 bg-white px-5 py-4 shadow-2xl shadow-slate-950/20">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
          ✓
        </div>

        <div className="min-w-0">
          <p className="text-sm font-bold text-slate-900">
            {message}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Your changes have been saved successfully.
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}