import { useDisclosure } from "@mantine/hooks";
import React from "react";

export const DrawerContext = React.createContext(null);

const DrawerProvider = ({ children }) => {
  const [opened, { open, close, toggle }] = useDisclosure(false);

  return (
    <DrawerContext.Provider
      value={{
        opened,
        open,
        close,
        toggle,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

export default DrawerProvider;
