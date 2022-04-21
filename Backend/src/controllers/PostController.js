const Post = require("../models/Post");
const isExpired = require("../../utils/checkExpires");

class PostController {
  /*
   * @POST: post/
   * @Access: khi da login
   * @DESC: Tạo một bài post mới
   */
  async create(req, res) {
    if (!isExpired(req, res)) {
      return res.status(456).json({
        error: "Bạn đã hết phiên đăng nhập, vui lòng đăng nhập lại",
      });
    }
    try {
      const { content, photo } = req.body;
      if (!content || !photo) {
        return res.status(400).json({
          error: "Vui lòng điền đầy đủ thông tin",
        });
      }
      const newPost = new Post({ content, photo, userId: req.user.userId });
      await newPost.save();

      return res.json({
        data: newPost,
        success: "Tạo thành công",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "Lỗi server",
      });
    }
  }
  /*
   * @GET: post/
   * @Access: Khi đã login
   * @DESC: Xem các bài post
   */
  async showAll(req, res) {
    if (!isExpired(req, res)) {
      return res.status(456).json({
        error: "Bạn đã hết phiên đăng nhập, vui lòng đăng nhập lại",
      });
    }
    const posts = await Post.find({})
      .populate("userId", ["fullName", "email", "isAdmin"])
      .populate({
        path: "comments",
        select: ["userId", "content"],
        populate: {
          path: "userId",
          select: "fullName"
        },
      })
      .sort({ createdAt: "desc" });
    if (posts.length > 0) {
      return res.json({
        data: posts,
        success: "Hiển thị thành công",
      });
    } else {
      return res.status(400).json({
        error: "Không có bài viết nào",
      });
    }
  }
  /*
   * @GET: post/:id
   * @Access: Khi đã login
   * @DESC: Xem bài viết và comment
   */
  async show(req, res) {
    if (!isExpired(req, res)) {
      return res.status(456).json({
        error: "Bạn đã hết phiên đăng nhập, vui lòng đăng nhập lại",
      });
    }
    const id = req.params.id;
    const post = await Post.findById(id)
      .populate("userId", ["fullName", "email", "isAdmin"])
      .sort({ _id: 1 });
    if (post) {
      return res.json({
        data: post,
        success: "Hiển thị thành công bài viết",
      });
    } else {
      return res.status(404).json({
        error: "Không tồn tại bài viết",
      });
    }
  }
  /*
   * @PUT: post/:id
   * @Access: Khi đã login và đúng user mới cho sửa
   * @DESC: Sửa posts
   */
  async edit(req, res) {
    if (!isExpired(req, res)) {
      return res.status(456).json({
        error: "Bạn đã hết phiên đăng nhập, vui lòng đăng nhập lại",
      });
    }
    const id = req.params.id;
    const post = await Post.findOne({ _id: id });
    if (!req.user.isAdmin) {
      if (post.userId.toString() !== req.user.userId) {
        return res.status(401).json({
          error: "Bạn không có quyền sửa bài viết này",
        });
      }
    }

    try {
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      return res.json({
        data: updatedPost,
        success: "Chỉnh sửa thành công",
      });
    } catch (error) {
      return res.status(400).json({
        error: "Chỉnh sửa thất bại",
      });
    }
  }
  /*
   * @DELETE: post/:id
   * @Access: Khi đã login và đúng user mới cho xóa
   * @DESC: Xóa posts
   */
  async destroy(req, res) {
    if (!isExpired(req, res)) {
      return res.status(456).json({
        error: "Bạn đã hết phiên đăng nhập, vui lòng đăng nhập lại",
      });
    }
    const id = req.params.id;
    const post = await Post.findOne({ _id: id });
    if (!req.user.isAdmin) {
      if (post.userId.toString() !== req.user.userId) {
        return res.status(401).json({
          error: "Bạn không có quyền sửa bài viết này",
        });
      }
    }
    try {
      await Post.findByIdAndDelete(id);
      return res.status(200).json({
        success: "Xóa thành công",
      });
    } catch (error) {
      return res.status(400).json({
        error: "Xóa thất bại",
      });
    }
  }
  async like(req, res) {
    if (!isExpired(req, res)) {
      return res.status(456).json({
        error: "Bạn đã hết phiên đăng nhập, vui lòng đăng nhập lại",
      });
    }
    try {
      const postId = req.params.id;
      const post = await Post.findById(postId);
      const userId = req.user.userId;
      const postLikeObject = post.likes;
      if (postLikeObject.includes(userId)) {
        postLikeObject.remove(userId);
        await post.save();
        return res.status(201).json({
          data: post,
          msg: "Dislike thành công",
        });
      } else {
        postLikeObject.unshift(userId);
        await post.save();
        return res.status(200).json({
          data: post,
          msg: "Like thành công",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        msg: "Lỗi server",
      });
    }
  }
}

module.exports = new PostController();
