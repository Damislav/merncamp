import Post from "../models/post";
export const createPost = async (req, res) => {
  const { content } = req.body;
  if (!content.length) {
    return res.json({
      error: "Content is required",
    });
  }

  try {
    const post = new Post({ content, postedBy: req.user._id });
    post.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Adding post failed" });
  }
};
