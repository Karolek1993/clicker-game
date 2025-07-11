import { createContext, useContext, useState } from 'react';

interface UIContextProps {
  farmWindowOpen: boolean;
  windmillWindowOpen: boolean;
  bakeryWindowOpen: boolean;

  setFarmWindow: () => void;
  setWindmillWindow: () => void;
  setBakeryWindow: () => void;
}

const UIContext = createContext<UIContextProps | undefined>(undefined);

export function UIContextProvider({ children }: { children: React.ReactNode }) {
  const [farmWindowOpen, setFarmWindowOpen] = useState<boolean>(true);
  const [windmillWindowOpen, setWindmillWindowOpen] = useState<boolean>(false);
  const [bakeryWindowOpen, setBakeryWindowOpen] = useState<boolean>(false);

  function setFarmWindow() {
    setFarmWindowOpen(true);
    setWindmillWindowOpen(false);
    setBakeryWindowOpen(false);
  }
  function setWindmillWindow() {
    setFarmWindowOpen(false);
    setWindmillWindowOpen(true);
    setBakeryWindowOpen(false);
  }
  function setBakeryWindow() {
    setFarmWindowOpen(false);
    setWindmillWindowOpen(false);
    setBakeryWindowOpen(true);
  }

  return (
    <UIContext.Provider
      value={{
        farmWindowOpen,
        windmillWindowOpen,
        bakeryWindowOpen,
        setFarmWindow,
        setWindmillWindow,
        setBakeryWindow,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUIContext() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUIContext must be used within a UIContextProvider');
  }
  return context;
}
