import { defineConfig } from 'vitest/config';

export default defineConfig(() => {
    const timeOut = 300_000;
    return {
        test: {
            watch: false,
            hookTimeout: timeOut,
            testTimeout: timeOut,
        },
    };
});
