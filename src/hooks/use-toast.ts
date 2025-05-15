
import { useState, useEffect } from "react"

// Define variant types that match shadcn toast component
export type ToastVariant = "default" | "destructive" | "success" | "warning" | "info";

export interface ToastProps {
  id?: string
  title: string
  description?: string
  variant?: ToastVariant
  duration?: number
  action?: React.ReactNode
  open?: boolean
}

export type Toast = ToastProps

let toastCount = 0

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([])

  // Handle global toast events
  useEffect(() => {
    const handleToast = (event: CustomEvent<ToastProps>) => {
      toast(event.detail);
    };

    document.addEventListener("toast" as any, handleToast as EventListener);

    return () => {
      document.removeEventListener("toast" as any, handleToast as EventListener);
    };
  }, []);

  const toast = (props: ToastProps) => {
    const id = props.id || String(toastCount++)
    const newToast: Toast = { 
      ...props, 
      id,
      open: true,
      variant: props.variant || "default"
    }
    
    setToasts((prevToasts) => [...prevToasts, newToast])
    
    if (props.duration !== Infinity) {
      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id))
      }, props.duration || 5000)
    }
    
    return id
  }
  
  const dismiss = (toastId?: string) => {
    setToasts((prevToasts) => 
      toastId ? prevToasts.filter((t) => t.id !== toastId) : []
    )
  }

  return {
    toast,
    dismiss,
    toasts
  }
}

interface ToastHelpers {
  (props: ToastProps): void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  warning: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
}

// Create a singleton toast function
export const toast: ToastHelpers = ((props: ToastProps) => {
  document.dispatchEvent(
    new CustomEvent("toast", { 
      detail: props 
    })
  );
}) as ToastHelpers;

toast.success = (title: string, description?: string) => {
  document.dispatchEvent(
    new CustomEvent("toast", { 
      detail: { title, description, variant: "success" } 
    })
  );
};

toast.error = (title: string, description?: string) => {
  document.dispatchEvent(
    new CustomEvent("toast", { 
      detail: { title, description, variant: "destructive" } 
    })
  );
};

toast.warning = (title: string, description?: string) => {
  document.dispatchEvent(
    new CustomEvent("toast", { 
      detail: { title, description, variant: "warning" } 
    })
  );
};

toast.info = (title: string, description?: string) => {
  document.dispatchEvent(
    new CustomEvent("toast", { 
      detail: { title, description, variant: "info" } 
    })
  );
};
