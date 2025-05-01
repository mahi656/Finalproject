import { Toaster as SonnerToaster } from 'sonner';

export function Toaster() {
  return (
    <SonnerToaster
      className="sonner-toaster"
      position="bottom-right"
      expand={false}
      closeButton
      richColors
    />
  );
}