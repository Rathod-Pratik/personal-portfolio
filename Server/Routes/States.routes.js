import { FetchStates, IncrementView } from "../Controller/Stats.controller.js";
import { checkAdminCookie } from "../Middleware/Auth.middleware.js";

import express from "express";

const routes = express.Router();

routes.get("/", checkAdminCookie, FetchStates);
routes.put("/view", IncrementView);

export default routes;
