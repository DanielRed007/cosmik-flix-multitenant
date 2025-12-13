// src/routes/auth.routes.ts
import { Router } from "express";
import { register, login, logout, refresh, me } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

/**
 * @openapi
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "securePassword123"
 *             additionalProperties: false
 *     responses:
 *       '201':
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User registered successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                       format: email
 *       '400':
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User already exists"
 */

router.post("/register", register);

/**
 * @openapi
 * /login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user with email and password. On success, sets a secure HttpOnly refresh token cookie and returns an access token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "securePassword123"
 *             additionalProperties: false
 *     responses:
 *       '200':
 *         description: Login successful. Returns user info and access token. A refresh token is set as an HttpOnly cookie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "507f1f77bcf86cd799439011"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "john@example.com"
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         headers:
 *           Set-Cookie:
 *             description: HttpOnly refresh token cookie (not visible in response body)
 *             schema:
 *               type: string
 *               example: refreshToken=abc123; Path=/; HttpOnly; Secure; SameSite=Strict
 *       '400':
 *         description: Invalid credentials (wrong email or password)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid credentials"
 */

router.post("/login", login);

/**
 * @openapi
 * /logout:
 *   post:
 *     summary: User logout
 *     description: Invalidates the current refresh token (if present) and clears the refreshToken cookie.
 *     tags:
 *       - Authentication
 *     security: []  # No access token required — only cookie-based refresh token
 *     responses:
 *       '200':
 *         description: Successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logged out"
 *         headers:
 *           Set-Cookie:
 *             description: Clears the refreshToken cookie
 *             schema:
 *               type: string
 *               example: refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict
 */

router.post("/logout", logout);

/**
 * @openapi
 * /refresh:
 *   post:
 *     summary: Refresh access token
 *     description: Validates the HttpOnly refresh token from the cookie and issues a new short-lived access token. No request body required.
 *     tags:
 *       - Authentication
 *     security: []  # Explicitly no Bearer token needed — relies on cookie
 *     responses:
 *       '200':
 *         description: New access token issued successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Nz..."
 *               required:
 *                 - accessToken
 *       '401':
 *         description: Unauthorized — missing, invalid, or expired refresh token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No token"
 *             examples:
 *               noToken:
 *                 value: { message: "No token" }
 *               invalidOrExpired:
 *                 value: { message: "Invalid or expired refresh token" }
 */

router.post("/refresh", refresh);

/**
 * @openapi
 * /me:
 *   get:
 *     summary: Get current user profile
 *     description: Returns the authenticated user's profile information (excluding password).
 *     tags:
 *       - Authentication
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
 *                     id:
 *                       type: string
 *                       example: "507f1f77bcf86cd799439011"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "john@example.com"
 *                   required:
 *                     - id
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
 *         description: User not found (e.g., account deleted after token issuance)
 */

router.get("/me", authMiddleware, me);

export default router;