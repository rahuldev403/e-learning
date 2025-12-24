import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

interface ProviderProps {
  children: ReactNode;
  [key: string]: unknown;
}

const Provider = ({ children, ...props }: ProviderProps) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

export default Provider;
