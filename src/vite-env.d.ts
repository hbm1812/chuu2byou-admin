/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    readonly VITE_API_CATEGORY: string;
    readonly VITE_API_SECURITY: string;
    readonly VITE_API_CONTRACT: string;
    readonly VITE_API_REPORT: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
