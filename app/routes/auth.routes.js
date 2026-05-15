import express from "express";
import { 
  signup, 
  signin, 
  refreshToken, 
  signout 
} from "../controllers/auth.controller.js";
import {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
} from "../middlewares/verifySignUp.js";

const router = express.Router();

// Ruta para el registro de usuarios
router.post(
  "/signup", 
  [checkDuplicateUsernameOrEmail, checkRolesExisted], 
  signup
);

// Ruta para el inicio de sesión
router.post("/signin", signin);

// NUEVA: Ruta para refrescar el Access Token usando el Refresh Token
router.post("/refreshtoken", refreshToken);

// NUEVA: Ruta para cerrar sesión e invalidar el Refresh Token
router.post("/signout", signout);

export default router;