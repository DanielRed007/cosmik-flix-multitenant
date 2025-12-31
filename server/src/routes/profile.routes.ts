// src/routes/profile.routes.ts
import { Router } from "express";
import { getMyProfile, updateMyProfile } from "../controllers/profile.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

/**
 * @openapi
 * /:
 *   get:
 *     summary: Get current user profile
 *     description: Returns the authenticated user's profile information (excluding password).
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Current user data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "john@example.com"
 *                   required:
 *                     - name
 *                     - email
 *       '401':
 *         description: Unauthorized - missing or invalid access token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       '404':
 *         description: Profile not found (e.g., account deleted after token issuance)
 */

router.get("/", authMiddleware, getMyProfile);

/**
 * @openapi
 * /:
 *   patch:
 *     summary: Update current user profile
 *     description: Partially updates the authenticated user's profile. Only provided fields are updated (temporary implementation requires email in body until auth middleware is added).
 *     tags:
 *       - Profile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Used to identify the profile (temporary)
 *                 example: "john@example.com"
 *               name:
 *                 type: string
 *                 example: "John Updated"
 *               city:
 *                 type: string
 *                 nullable: true
 *                 example: "Los Angeles"
 *               zipCode:
 *                 type: string
 *                 nullable: true
 *                 example: "90001"
 *               age:
 *                 type: integer
 *                 nullable: true
 *                 minimum: 13
 *                 maximum: 120
 *                 example: 35
 *               favoriteGenres:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                     - Action
 *                     - Adventure
 *                     - Animation
 *                     - Comedy
 *                     - Crime
 *                     - Documentary
 *                     - Drama
 *                     - Family
 *                     - Fantasy
 *                     - Horror
 *                     - Mystery
 *                     - Romance
 *                     - Sci-Fi
 *                     - Thriller
 *                     - Western
 *                 example: ["Action", "Thriller", "Drama"]
 *             additionalProperties: false
 *     responses:
 *       '200':
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profile updated successfully"
 *                 profile:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                       format: email
 *                     city:
 *                       type: string
 *                       nullable: true
 *                     zipCode:
 *                       type: string
 *                       nullable: true
 *                     age:
 *                       type: integer
 *                       nullable: true
 *                     favoriteGenres:
 *                       type: array
 *                       items:
 *                         type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       '400':
 *         description: Bad request (e.g., missing email)
 *       '404':
 *         description: Profile not found
 *       '500':
 *         description: Internal server error
 */

router.patch("/", authMiddleware ,updateMyProfile);

export default router;