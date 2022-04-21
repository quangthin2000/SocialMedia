const Notification = require("../models/Notifications");
const isExpired = require("../../utils/checkExpires");
class NotificationController {
  async create(req, res) {
    if (!isExpired(req, res)) {
      return res.status(456).json({
        error: "Bạn đã hết phiên đăng nhập, vui lòng đăng nhập lại",
      });
    }
    const { toUserId, content, postId } = req.body;
    if (!content) {
      return res.status(400).json({ msg: "Vui lòng nhập content" });
    }
    const notification = new Notification({
      fromUserId: req.user.userId,
      toUserId,
      content,
      postId,
    });
    try {
      await notification.save();
      // console.log(notification);
      return res.json({
        data: notification,
        msg: "Thêm thành công",
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Lỗi server",
      });
    }
  }

  async showNotificationByToUser(req, res) {
    if (!isExpired(req, res)) {
      return res.status(456).json({
        error: "Bạn đã hết phiên đăng nhập, vui lòng đăng nhập lại",
      });
    }

    const notifications = await Notification.find({ toUserId: req.user.userId }).sort({createdAt: 'desc'})
      .populate("fromUserId")
      .populate("toUserId")
      .populate("postId");
    if (notifications.length > 0) {
      return res.json({
        data: notifications,
        msg: "",
      });
    } else {
      return res.json({
        data: [],
        msg: "",
      });
    }
  }

  async editIsRead(req, res) {
    if (!isExpired(req, res)) {
      return res.status(456).json({
        error: "Bạn đã hết phiên đăng nhập, vui lòng đăng nhập lại",
      });
    }
    const id = req.params.id;
    const notification = await Notification.findOneAndUpdate(
      { _id: id },
      { $set: { isRead: true } }
    );
    return res.json({
      data: notification,
    });
  }

  async delete(req, res) {
    if (!isExpired(req, res)) {
      return res.status(456).json({
        error: "Bạn đã hết phiên đăng nhập, vui lòng đăng nhập lại",
      });
    }
    const id = req.params.id;
    const notification = await Notification.findOne({ _id: id });
    if (req.user.userId != notification.toUserId.toString()) {
      return res.status(403).json({
        msg: "Bạn không được xóa thông báo này",
      });
    }
    try {
      await Notification.findOneAndDelete({ _id: id });
      return res.json({
        msg: "Xóa thành công",
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Lỗi server",
      });
    }
  }
  async deleteAll(req, res) {
    if (!isExpired(req, res)) {
      return res.status(456).json({
        error: "Bạn đã hết phiên đăng nhập, vui lòng đăng nhập lại",
      });
    }
    try {
      await Notification.deleteMany({ toUserId: req.user.userId });
      return res.status(200).json({
        msg: "Xóa tất cả thành công",
      });
    } catch (error) {
      return res.status(400).json({
        msg: "Lỗi server",
      });
    }
  }
}
module.exports = new NotificationController();
