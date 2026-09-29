import { createContext, useContext, useState } from "react";

// Lets any page put a short title in the middle of the header.
const HeaderTitleContext = createContext({ title: "", setTitle: () => {} });

export function HeaderTitleProvider({ children }) {
  const [title, setTitle] = useState("");
  return (
    <HeaderTitleContext.Provider value={{ title, setTitle }}>
      {children}
    </HeaderTitleContext.Provider>
  );
}

export const useHeaderTitle = () => useContext(HeaderTitleContext);