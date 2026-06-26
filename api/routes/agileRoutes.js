import express from "express";
import { generateAgilePlan } from "../controllers/blueprintController.js";

// Initialize an isolated Express Router instance
const router = express.Router();

/**
 * Route Configuration
 * Target: POST /api/agile/generate
 * Description: Receives the feature concept prompt and passes it to the AI swarm controller
 */
router.route('/generate').post(generateAgilePlan);

export default router;