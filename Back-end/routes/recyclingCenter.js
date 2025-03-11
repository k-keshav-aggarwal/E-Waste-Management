import express from "express"
const Router = express.Router()
import { getCenters,createCenter,deleteCenter } from "../controllers/recyclingCenter.js"

Router.route("/").get(getCenters).post(createCenter)
Router.route("/:id").delete(deleteCenter)

export default Router