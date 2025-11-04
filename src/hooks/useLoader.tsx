import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { useLocation, useNavigationType } from "react-router-dom";

interface LoaderContextType {
  loading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true); // <-- start as true for first load

  const showLoader = useCallback(() => setLoading(true), []);
  const hideLoader = useCallback(() => setLoading(false), []);

  const location = useLocation();
  const navigationType = useNavigationType();

  // Automatically show loader on route changes
  useEffect(() => {
    showLoader();
    const timer = setTimeout(() => {
      hideLoader();
    }, 600); // Adjust to how long you want loader to show
    return () => clearTimeout(timer);
  }, [location.pathname, navigationType, showLoader, hideLoader]);

  const value: LoaderContextType = { loading, showLoader, hideLoader };

  return (
    <LoaderContext.Provider value={value}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = (): LoaderContextType => {
  const context = useContext(LoaderContext);
  if (!context) throw new Error("useLoader must be used within a LoaderProvider");
  return context;
};
