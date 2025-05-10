// Add CSS property declarations for TypeScript
declare module 'react' {
  interface CSSProperties {
    transformStyle?: 'preserve-3d' | 'flat';
    WebkitBackfaceVisibility?: 'visible' | 'hidden';
    backfaceVisibility?: 'visible' | 'hidden';
  }
  
  // Make sure React hooks and functions are properly typed
  export const useState: typeof import('react').useState;
  export const useEffect: typeof import('react').useEffect;
  export const useRef: typeof import('react').useRef;
  export const useCallback: typeof import('react').useCallback;
  export const useMemo: typeof import('react').useMemo;
  export const useContext: typeof import('react').useContext;
  export const createContext: typeof import('react').createContext;
  export const cloneElement: typeof import('react').cloneElement;
  export const createElement: typeof import('react').createElement;
  export const Fragment: typeof import('react').Fragment;
  export const forwardRef: typeof import('react').forwardRef;
  export const memo: typeof import('react').memo;
}

// For animations
declare module '*.jpg';
declare module '*.png';
declare module '*.svg';

// Define environmental variables
interface ImportMeta {
  env: {
    PROD: boolean;
    DEV: boolean;
    MODE: string;
    BASE_URL: string;
  };
} 