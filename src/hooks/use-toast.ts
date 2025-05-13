
import * as React from "react"

import { cn } from "@/lib/utils"
import { useToast as useToastBase } from "@/components/ui/use-toast"

type ToastProps = React.ComponentPropsWithoutRef<typeof useToastBase>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export type Toast = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
  variant?: "default" | "destructive" | "success" | "warning" | "info"
}

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 1000

type ToasterToast = Toast & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
  open: boolean
  variant?: "default" | "destructive" | "success" | "warning" | "info"
}

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

const toasts = React.createRef<ToasterToast[]>()

if (!toasts.current) {
  toasts.current = []
}

function addToRemoveQueue(toastId: string) {
  if (toasts.current?.length) {
    const timeout = setTimeout(() => {
      toasts.current = toasts.current?.filter((t) => t.id !== toastId)
    }, TOAST_REMOVE_DELAY)

    return () => clearTimeout(timeout)
  }
}

export const toast = {
  create(props: Toast) {
    const id = props.id || genId()

    const update = (props: Toast) => {
      if (toasts.current?.length) {
        const toast = toasts.current.find((t) => t.id === id)
        if (toast) {
          Object.assign(toast, { ...props, id })
        }
      }
    }

    const dismiss = () => {
      if (toasts.current?.length) {
        const index = toasts.current.findIndex((t) => t.id === id)
        if (index > -1) {
          const toast = toasts.current[index]
          if (toast) {
            Object.assign(toast, { open: false })
            addToRemoveQueue(id)
          }
        }
      }
    }

    const toast: ToasterToast = {
      ...props,
      id,
      open: true,
      onOpenChange: (open: boolean) => {
        if (!open) dismiss()
      },
    }

    if (toasts.current?.length >= TOAST_LIMIT) {
      toasts.current.shift()
    }

    toasts.current = [...toasts.current!, toast]

    return id
  },
  dismiss(toastId?: string) {
    if (toastId) {
      if (toasts.current?.length) {
        const index = toasts.current.findIndex((t) => t.id === toastId)
        if (index > -1) {
          const toast = toasts.current[index]
          if (toast) {
            Object.assign(toast, { open: false })
            addToRemoveQueue(toastId)
          }
        }
      }
    } else {
      if (toasts.current?.length) {
        toasts.current.forEach((toast) => {
          Object.assign(toast, { open: false })
          addToRemoveQueue(toast.id)
        })
      }
    }
  },
  error(message: string) {
    return toast.create({
      variant: "destructive",
      title: "Error",
      description: message,
    })
  },
  success(message: string) {
    return toast.create({
      variant: "success",
      title: "Success",
      description: message,
    })
  },
  warning(message: string) {
    return toast.create({
      variant: "warning",
      title: "Warning",
      description: message,
    })
  },
  info(message: string) {
    return toast.create({
      variant: "info",
      title: "Information",
      description: message,
    })
  },
}

export function useToast() {
  const { toast: baseToast } = useToastBase()

  return {
    toast: Object.assign(baseToast, toast),
    dismiss: toast.dismiss,
  }
}

export type { ToastActionElement, ToastProps }

