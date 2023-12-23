const User = require("../models/user");

const adminController = {
    getAllUsers: async (req, res) => {
        try {
            const user = await User.find();
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.userId);
            // const user = await User.findByIdAndDelete(req.params.userId);
            if (!user) {
                return res.status(404).json({ message: "không tìm thấy người dùng" });
            }
            res.status(200).json({ message: "Xoá thành công", deletedUser: user });
        } catch (err) {
            res.status(500).json(err);
        }
    }
};


module.exports = adminController;