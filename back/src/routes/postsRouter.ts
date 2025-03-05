import { Router } from 'express'
import { getAllPostsController, getPostByIdController, createPostController, updatePostController, deletePostController } from '../controllers/postsControllers'

const postsRoute: Router = Router()


postsRoute.get("/", getAllPostsController)
postsRoute.get("/:id", getPostByIdController)
postsRoute.post("/create", createPostController)
postsRoute.put("/update/:id", updatePostController)
postsRoute.delete("/delete/:id", deletePostController)

export default postsRoute