
import * as React from "react";
import { ToastActionElement, ToastProps } from "@/components/ui/toast";

export type Toast = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: "default" | "destructive" | "success" | "warning" | "info";
};

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 1000;

type ToasterToast = Toast & {
  open: boolean;
};

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

const toasts = React.createRef<ToasterToast[]>();

if (!toasts.current) {
  toasts.current = [];
}

function addToRemoveQueue(toastId: string) {
  if (toasts.current?.length) {
    const timeout = setTimeout(() => {
      if (toasts.current) {
        toasts.current = toasts.current.filter((t) => t.id !== toastId);
      }
    }, TOAST_REMOVE_DELAY);

    return () => clearTimeout(timeout);
  }
}

export const toast = {
  create(props: Toast) {
    const id = props.id || genId();

    const update = (props: Toast) => {
      if (toasts.current?.length) {
        const toast = toasts.current.find((t) => t.id === id);
        if (toast) {
          Object.assign(toast, { ...props, id });
        }
      }
    };

    const dismiss = () => {
      if (toasts.current?.length) {
        const index = toasts.current.findIndex((t) => t.id === id);
        if (index > -1) {
          const toast = toasts.current[index];
          if (toast) {
            toast.open = false;
            addToRemoveQueue(id);
          }
        }
      }
    };

    const newToast: ToasterToast = {
      ...props,
      id,
      open: true,
    };

    if (toasts.current && toasts.current.length >= TOAST_LIMIT) {
      toasts.current.shift();
    }

    if (toasts.current) {
      toasts.current = [...toasts.current, newToast];
    }

    return id;
  },
  dismiss(toastId?: string) {
    if (toastId) {
      if (toasts.current?.length) {
        const index = toasts.current.findIndex((t) => t.id === toastId);
        if (index > -1) {
          const toast = toasts.current[index];
          if (toast) {
            toast.open = false;
            addToRemoveQueue(toastId);
          }
        }
      }
    } else {
      if (toasts.current?.length) {
        toasts.current.forEach((toast) => {
          toast.open = false;
          addToRemoveQueue(toast.id);
        });
      }
    }
  },
  error(message: string) {
    return this.create({
      id: genId(),
      variant: "destructive",
      title: "Error",
      description: message,
    });
  },
  success(message: string) {
    return this.create({
      id: genId(),
      variant: "success",
      title: "Success",
      description: message,
    });
  },
  warning(message: string) {
    return this.create({
      id: genId(),
      variant: "warning",
      title: "Warning",
      description: message,
    });
  },
  info(message: string) {
    return this.create({
      id: genId(),
      variant: "info",
      title: "Information",
      description: message,
    });
  },
};

export function useToast() {
  return {
    toast,
    toasts: toasts.current || [],
    dismiss: toast.dismiss,
  };
}
