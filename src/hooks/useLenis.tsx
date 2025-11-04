import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
    type ReactNode,
} from "react";
import Lenis from "@studio-freight/lenis";

interface LenisContextType {
    lenis: Lenis | null;
}

// Create context
const LenisContext = createContext<LenisContextType | undefined>(undefined);

// Provider
export const LenisProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const lenisRef = useRef<Lenis | null>(null);
    const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
            smoothTouch: false,
        } as any);


        lenisRef.current = lenis;
        setLenisInstance(lenis); // triggers re-render with valid instance

        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            lenisRef.current = null;
            setLenisInstance(null);
        };
    }, []);

    return (
        <LenisContext.Provider value={{ lenis: lenisInstance }}>
            {children}
        </LenisContext.Provider>
    );
};

// Hook to access Lenis
export const useLenis = (): LenisContextType => {
    const context = useContext(LenisContext);
    if (!context) {
        throw new Error("useLenis must be used within a LenisProvider");
    }
    return context;
};
