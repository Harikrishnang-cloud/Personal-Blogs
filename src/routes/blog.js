const express = require("express")
const router = express.Router()
const {
    listPosts,
    newPostForm,
    createPost,
    showPost,
    editPostForm,
    updatePost,
    deletePost,
} = require("../controllers/blogController")

// Avoid ObjectId cast errors from browser favicon request
router.get("/favicon.ico", (req, res) => res.status(204).end())

//Home Route
router.get("/", listPosts)

//Create Get Route
router.get("/new", newPostForm)

//Edit Get Router
router.get("/:id/edit", editPostForm)

//Edit Post Router
router.put("/:id/edit", updatePost)

//Create post Route
router.post("/", createPost)

//show a single route
router.get("/:id", showPost)

//Delete Post Router
router.delete("/:id", deletePost)

module.exports = router;