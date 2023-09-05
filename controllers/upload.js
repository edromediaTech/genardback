const upload = require("../middleware/upload");

exports.multipleUpload = async (req, res) => {
  try {
    await upload(req, res);
    console.log(req.files);

    if (req.files.length <= 0) {
      return res.send(`You must select at least 1 file.`);
    }

    //return res.send(`Files has been uploaded.`);
    console.log(req.files[0].filename)
    return res.status(200).json({filename:req.files[0].filename})
    
  } catch (error) {
    console.log(error);

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.send("Too many files to upload.");
    }
    return res.send(`Error when trying upload many files: ${error}`);
  }
};