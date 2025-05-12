const { Router } = require('express');
const { PostModel } = require("./db"); 

const adminRouter = Router();

// ✅ Create a new post
adminRouter.post("/posts", async (req, res) => {
  try {
    const { title, content, user } = req.body;
    
    const newPost = new PostModel({ 
      title, 
      content, 
      user: user || "Anonymous", 
      timestamp: Date.now(), 
      replies: [] 
    });
    
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
});

// ✅ Fetch all posts (Sorted by latest)
adminRouter.get("/posts", async (req, res) => {
  try {
    const posts = await PostModel.find().sort({ timestamp: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Delete a post
adminRouter.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await PostModel.findByIdAndDelete(id);
    
    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Add a reply to a post
adminRouter.post('/posts/:postId/reply', async (req, res) => {
  try {
    const { postId } = req.params;
    const { content, user } = req.body;

    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const reply = { content, user, timestamp: Date.now() }; // ✅ Added timestamp for replies
    post.replies.push(reply);
    await post.save();

    res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ message: "Error adding reply", error });
  }
});

module.exports = adminRouter;
