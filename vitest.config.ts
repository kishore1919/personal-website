import { defineConfig } from 'vitest/config';

export default defineConfig(() => {
    const timeOut = 300_000;
    return {
        test: {
            watch: false,
            teardownTimeout: timeOut,
            hookTimeout: timeOut,
            testTimeout: timeOut,
        },
    };
});
