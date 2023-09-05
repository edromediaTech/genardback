const { role } = require("../role");
exports.getAllRole = async (req, res, next) => {
    res.status(200).json(role);
}
