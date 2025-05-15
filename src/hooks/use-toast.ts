
import { useState } from "react"

type ToastType = "default" | "success" | "error" | "warning" | "info"

interface ToastProps {
  id?: string
  title: string
  description?: string
  type?: ToastType
  duration?: number
}

type Toast = ToastProps

let toastCount = 0

const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = (props: ToastProps) => {
    const id = props.id || String(toastCount++)
    const newToast = { ...props, id }
    
    setToasts((prevToasts) => [...prevToasts, newToast])
    
    if (props.duration !== Infinity) {
      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id))
      }, props.duration || 5000)
    }
    
    return id
  }
  
  const success = (title: string, description?: string) => {
    return toast({ title, description, type: "success" })
  }
  
  const error = (title: string, description?: string) => {
    return toast({ title, description, type: "error" })
  }
  
  const warning = (title: string, description?: string) => {
    return toast({ title, description, type: "warning" })
  }
  
  const info = (title: string, description?: string) => {
    return toast({ title, description, type: "info" })
  }
  
  const dismiss = (toastId?: string) => {
    setToasts((prevToasts) => 
      toastId ? prevToasts.filter((t) => t.id !== toastId) : []
    )
  }

  return {
    toast,
    success,
    error,
    warning,
    info,
    dismiss,
    toasts
  }
}

// Export a singleton instance for global usage
const toast = {
  success: (title: string, description?: string) => {
    document.dispatchEvent(
      new CustomEvent("toast", { 
        detail: { title, description, type: "success" } 
      })
    )
  },
  error: (title: string, description?: string) => {
    document.dispatchEvent(
      new CustomEvent("toast", { 
        detail: { title, description, type: "error" } 
      })
    )
  },
  warning: (title: string, description?: string) => {
    document.dispatchEvent(
      new CustomEvent("toast", { 
        detail: { title, description, type: "warning" } 
      })
    )
  },
  info: (title: string, description?: string) => {
    document.dispatchEvent(
      new CustomEvent("toast", { 
        detail: { title, description, type: "info" } 
      })
    )
  }
}

export { useToast, toast, type Toast }
