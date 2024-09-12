/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    readonly VITE_API_CATEGORY: string;
    readonly VITE_API_SECURITY: string;

}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
