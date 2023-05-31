import { Router } from "express"

import authentication from "./authentication"
import language from "./language"
import user from "./user"

const router = Router()

export default (): Router => {
  language(router)
  authentication(router)
  user(router)

  return router
}
