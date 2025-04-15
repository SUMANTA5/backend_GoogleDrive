const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const upload = require("../utils/upload");
const { folder, file, getItemsFilesByUser, deleteItem, getItemsFilesDetailsByUser, getItemsFileByName, deleteFilesByFolderName } = require("../controllers/ItemController");

// Make sure each handler function is properly passed
router.post("/folder", auth, folder);
router.post("/file", auth, upload.single("file"), file);
router.get("/items", auth, getItemsFilesByUser);
router.post("/folders", auth, getItemsFilesDetailsByUser);
router.get("/file-by-name", auth, getItemsFileByName);
router.post("/delete-by-folder", auth, deleteFilesByFolderName);

router.delete("/:id", auth, deleteItem);

module.exports = router;
