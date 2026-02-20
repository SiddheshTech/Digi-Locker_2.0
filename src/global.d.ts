export { };

declare global {
    interface Window {
        ethereum?: {
            request: (...args: unknown[]) => Promise<unknown>;
            on: (...args: unknown[]) => void;
            removeListener: (...args: unknown[]) => void;
        };
    }
}
