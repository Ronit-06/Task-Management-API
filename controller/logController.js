import log from "../models/log.model.js";

//Activity log - Admin only
export const getLogs = async (req, res, next) => {
  try {
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }
    const logs = await log.find();
    res.status(200).json({ success: true, data: logs });
  } catch (error) {
    next(error);
  }
};