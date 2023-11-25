import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type SidebarProviderProps = {
  children: ReactNode;
};

type SidebarContextType = {
  isLargeOpen: boolean;
  isSmallOpen: boolean;
  toggle: () => void;
  close: () => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export function useSidebarContext() {
  const value = useContext(SidebarContext);
  if (value === null) {
    throw new Error('Cannot use outside of Sidebar Provider');
  }
  return value;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isLargeOpen, setIsLargeOpen] = useState(true);
  const [isSmallOpen, setIsSmallOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (!isSmallScreen()) {
        setIsSmallOpen(false);
      }
    };

    window.addEventListener('resize', handler);

    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);

  function isSmallScreen() {
    return window.innerWidth < 1024;
  }

  function toggle() {
    if (isSmallScreen()) {
      setIsSmallOpen((s) => !s);
    } else {
      setIsLargeOpen((l) => !l);
    }
  }
  function close() {
    if (isSmallScreen()) {
      setIsSmallOpen(false);
    } else {
      setIsLargeOpen(false);
    }
  }
  return (
    <SidebarContext.Provider
      value={{
        isLargeOpen,
        isSmallOpen,
        toggle,
        close,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
