import type { ReactNode } from "react";
import { XIcon } from "@phosphor-icons/react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  actions?: ReactNode;
  width?: string;
}

const Modal = ({ open, onClose, title, children, actions, width = "max-w-md" }: ModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`bg-zinc-900 w-full ${width} rounded-xl p-6 relative`}>
        
        {/* Botão fechar */}
        <button className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-200" onClick={onClose}>
          <XIcon size={20} weight="bold" />
        </button>

        {/* Título */}
        {title && <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>}

        {/* Conteúdo */}
        <div className="mb-6">
          {children}
        </div>

        {/* Rodapé com ações */}
        {actions && <div className="flex gap-3 justify-end">{actions}</div>}
      </div>
    </div>
  );
};

export default Modal;
