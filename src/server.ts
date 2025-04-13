import 'dotenv/config';
import env from './types/env';
import { logError, logInfo } from './utils/logger';
import app from './app';

/**
 * Run server startup procedure
 */
const run = async () => {
    try {
        logInfo('Starting server...');
        app.listen(env.Port, () => logInfo(`Server started on port ${env.Port}`));
    } catch (err: unknown) {
        logError('Server startup failed', err instanceof Error ? err : undefined);
    }
};

run();
