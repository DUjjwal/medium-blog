import { Router } from "express";
import { createBlog, getAllBlog, signin, signup, updateBlog, getParticularBlog, addTag } from "../controllers/controller.js";
import { auth, auth2 } from "../middlewares/auth.js";

const router = Router()

router.route("/signup").post(signup)
router.route("/signin").post(signin)
router.route("/blog").post(auth,createBlog) // create a blog must be protected
router.route("/blog").put(auth, updateBlog) // update a blog must be protected
router.route("/blog/:id").get(auth2, getParticularBlog) // get a blog must be protected
router.route("/getAll").get(auth2, getAllBlog) // get all blogs
router.route("/tags").post(auth, addTag)

export default router