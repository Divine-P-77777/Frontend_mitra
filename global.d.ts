declare module "intro.js/introjs.css";
declare module "*.css";


declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: "development" | "production" | "test";
    NEXT_PUBLIC_API_BASE_URL?: string;
    DATA_GOV_API_KEY?: string;
    OPENCAGE_API_KEY?: string;
    MONGODB_URI?: string;
    // Add any other env vars your app reads:
    [key: string]: string | undefined;
  }
}