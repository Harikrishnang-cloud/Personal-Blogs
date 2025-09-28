const Blog = require("../db/blogSchema");
const mongoose = require("mongoose");

// GET / - list posts
async function listPosts(req, res) {
  try {
    const posts = await Blog.find().sort({ createdAt: -1 });
    res.render("index", { title: "PersonalBlog", posts });
  } catch (err) {
    res.status(500).send("Failed to load posts");
  }
}

// GET /new - new form with recent posts
async function newPostForm(req, res) {
  try {
    const recent = await Blog.find().sort({ createdAt: -1 }).limit(3);
    const isAuthed = Boolean(req.session && req.session.userId);
    const userName = req.session && req.session.userName;
    res.render("new", { title: "New Blog", post: {}, recent, isAuthed, userName });
  } catch (err) {
    console.error("Failed to load recent posts for new form", err);
    const isAuthed = Boolean(req.session && req.session.userId);
    const userName = req.session && req.session.userName;
    res.render("new", { title: "New Blog", post: {}, recent: [], isAuthed, userName });
  }
}

// POST / - create
async function createPost(req, res) {
  try {
    if (!req.session || !req.session.userId) {
      return res.redirect("/new");
    }
    const { title, body } = req.body;
    const post = new Blog({ title, body });
    await post.save();
    res.redirect("/");
  } catch (err) {
    console.error("Failed to create post", err);
    res.status(500).send("Failed to create post");
  }
}

// GET /:id - show one
async function showPost(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("Post not found");
    }
    const post = await Blog.findById(id);
    if (!post) return res.status(404).send("Post not found");
    res.render("show", { title: "Blog details", post });
  } catch (err) {
    console.error("Failed to load post", err);
    res.status(500).send("Failed to load post");
  }
}

// GET /:id/edit - edit form
async function editPostForm(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("Post not found");
    }
    const post = await Blog.findById(id);
    if (!post) return res.status(404).send("Post not found");
    res.render("edit", { title: "Edit Blog", post });
  } catch (err) {
    console.error("Failed to load post for edit", err);
    res.status(500).send("Failed to load post");
  }
}

// PUT /:id/edit - update
async function updatePost(req, res) {
  try {
    const { title, body } = req.body;
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("Post not found");
    }
    const post = await Blog.findByIdAndUpdate(
      id,
      { title, body },
      { new: true }
    );
    if (!post) return res.status(404).send("Post not found");
    res.redirect(`/${post._id}`);
  } catch (err) {
    console.error("Failed to update post", err);
    res.status(500).send("Failed to update post");
  }
}

// DELETE /:id - delete
async function deletePost(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.redirect("/");
    }
    await Blog.findByIdAndDelete(id);
    res.redirect("/");
  } catch (err) {
    console.error("Failed to delete post", err);
    res.status(500).send("Failed to delete post");
  }
}

module.exports = {
  listPosts,
  newPostForm,
  createPost,
  showPost,
  editPostForm,
  updatePost,
  deletePost,
};
