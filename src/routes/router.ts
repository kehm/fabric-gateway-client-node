import express from 'express';
import chaincodesRoute from './chaincodes';

/**
 * Base route
 */
const router = express.Router();

router.use('/chaincodes', chaincodesRoute);

export default router;
