// src/routes/profile.routes.ts
import { Router } from "express";
import { getMyProfile, updateMyMovieList, updateMyProfile } from "../controllers/profile.controller";
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

/**
 * @openapi
 * /my-list:
 *   patch:
 *     summary: Add or remove a movie from the user's favorite list
 *     description: Allows the authenticated user to add a movie to or remove a movie from their personal favorites list. The operation is idempotent — adding an already-present movie or removing a non-existent one will not cause an error.
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []   # If you're using JWT Bearer tokens (recommended)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - movieId
 *               - action
 *             properties:
 *               movieId:
 *                 type: string
 *                 description: The IMDb ID (or your internal movie ID) of the movie to add or remove
 *                 example: "tt0111161"
 *               action:
 *                 type: string
 *                 enum: [add, remove]
 *                 description: Whether to add the movie to the list or remove it
 *                 example: "add"
 *             additionalProperties: false
 *     responses:
 *       '200':
 *         description: Favorites list updated successfully (or movie was already in the desired state)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Favorites updated successfully"
 *                 profile:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       nullable: true
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "john@example.com"
 *                     city:
 *                       type: string
 *                       nullable: true
 *                     zipCode:
 *                       type: string
 *                       nullable: true
 *                     age:
 *                       type: integer
 *                       nullable: true
 *                       minimum: 13
 *                       maximum: 120
 *                     favoriteGenres:
 *                       type: array
 *                       items:
 *                         type: string
 *                         enum:
 *                           - Action
 *                           - Adventure
 *                           - Animation
 *                           - Comedy
 *                           - Crime
 *                           - Documentary
 *                           - Drama
 *                           - Family
 *                           - Fantasy
 *                           - Horror
 *                           - Mystery
 *                           - Romance
 *                           - Sci-Fi
 *                           - Thriller
 *                           - Western
 *                       nullable: true
 *                     favoriteMoviesList:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: List of movie IDs the user has favorited
 *                       example: ["tt0111161", "tt0068646", "tt0468569"]
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       '400':
 *         description: Bad request — missing or invalid fields (movieId, action)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "movieId and action are required"
 *       '401':
 *         description: Unauthorized — user not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized: User not authenticated"
 *       '404':
 *         description: Profile not found for the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profile not found"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error while updating favorites"
 */

router.patch("/my-list", authMiddleware ,updateMyMovieList);

export default router;