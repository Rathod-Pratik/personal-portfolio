import { FetchStates } from "../Controller/Stats.controller.js";
import { checkAdminCookie } from "../Middleware/Auth.middleware.js";

import express from "express"

const routes =express.Router();

routes.get("/",checkAdminCookie, FetchStates);

export default routes;