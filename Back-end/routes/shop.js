import express from "express"
const Router = express.Router()
import { getItems } from "../controllers/shop.js"

Router.route("/").get(getItems)

export default Router