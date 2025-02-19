import React, { createContext, useState, useContext } from "react";

const FontSizeContext = createContext();

export const useFontSize = () => useContext(FontSizeContext);

export const FontSizeProvider = ({ children }) => {
  const defaultFontSize = 16;
  const [fontSize, setFontSize] = useState(defaultFontSize);

  const increaseFontSize = () => setFontSize((size) => Math.min(size + 2, 32));
  const decreaseFontSize = () => setFontSize((size) => Math.max(size - 2, 12));
  const resetFontSize = () => setFontSize(defaultFontSize); // Reset to default

  return (
    <FontSizeContext.Provider
      value={{ fontSize, increaseFontSize, decreaseFontSize, resetFontSize }}
    >
      {children}
    </FontSizeContext.Provider>
  );
};
