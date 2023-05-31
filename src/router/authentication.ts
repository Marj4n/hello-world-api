import { Router } from "express"

import { login, logout, register } from "../controllers/authentication"
import { isAuthenticated } from "../middlewares"

export default (router: Router) => {
  router.post("/auth/register", register)
  router.post("/auth/login", login)
  router.get("/auth/logout", isAuthenticated, logout)
}
