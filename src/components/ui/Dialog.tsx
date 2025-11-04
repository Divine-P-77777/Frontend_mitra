import { useEffect } from "react";
import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  width?: string;
}

export default function Dialog({
  open,
  onClose,
  title,
  children,
  width = "max-w-2xl",
}: DialogProps) {
  // Handle Escape key close (SSR-safe)
  useEffect(() => {
    if (typeof document === "undefined") return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0  z-50 flex items-center justify-center 
                     bg-black/20 backdrop-blur-sm overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "dialog-title" : undefined}
          onClick={onClose}
        >
          {/* Modal container */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full ${width} 
                       bg-gradient-to-br from-white via-white to-gray-50 
                       dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 
                       rounded-2xl shadow-xl p-5 sm:p-6 
                       max-h-[90vh] overflow-y-auto 
                       scrollbar-thin scrollbar-thumb-gray-300 
                       scrollbar-track-transparent`}
          >
            {/* Header */}
            {title && (
              <div className="flex justify-between items-center mb-4">
                <h2
                  id="dialog-title"
                  className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100"
                >
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 
                             dark:hover:bg-gray-800 transition-colors"
                  aria-label="Close dialog"
                >
                  <X size={18} />
                </button>
              </div>
            )}

            {/* Content */}
            <div className="text-gray-800 dark:text-gray-200">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
