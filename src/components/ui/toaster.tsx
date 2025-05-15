
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, variant, open, ...props }) => {
        // Map our toast variant to shadcn/ui variant
        const toastVariant = variant === "destructive" ? "destructive" : 
                             variant === "success" ? "default" :
                             variant === "warning" ? "default" :
                             variant === "info" ? "default" : "default";
        
        return (
          <Toast key={id} {...props} variant={toastVariant} open={open}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
