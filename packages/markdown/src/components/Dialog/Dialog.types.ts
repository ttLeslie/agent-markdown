export interface DialogProps {
  open: boolean;
}

export interface DialogEmits {
  (e: 'close'): void;
}
