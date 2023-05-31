import { create, destroy, index, show, update } from "@/controllers/language"
import { isAuthenticated } from "@/middlewares"
import { Router } from "express"

export default (router: Router) => {
  // router.get("/v1", indexWithLimit) // http://localhost:8080/api/v1?limit=2
  // router.get("/v1", showByName) // http://localhost:8080/api/v1?name=TypeScript
  router.get("/v1", index)
  router.get("/v1/:id", show)
  router.post("/v1", isAuthenticated, create)
  router.patch("/v1/:id", isAuthenticated, update)
  router.delete("/v1/:id", isAuthenticated, destroy)
}
