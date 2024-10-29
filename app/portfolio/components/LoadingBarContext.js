// LoadingBarContext.js
import { createContext, useContext, useRef } from 'react';

const LoadingBarContext = createContext();

export const LoadingBarProvider = ({ children, setProgress }) => {
  return (
    <LoadingBarContext.Provider value={{ setProgress }}>
      {children}
    </LoadingBarContext.Provider>
  );
};

export const useLoadingBar = () => useContext(LoadingBarContext);
