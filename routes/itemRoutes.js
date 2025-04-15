const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Item = require("../models/Item");
const upload = require("../utils/upload");

// Create folder
router.post("/folder", auth, async (req, res) => {
  const item = await Item.create({
    name: req.body.name,
    type: "folder",
    parent: req.body.parent || null,
    user: req.user._id,
  });
  res.json(item);
});

// Upload file
router.post("/file", auth, upload.single("file"), async (req, res) => {
  const item = await Item.create({
    name: req.file.originalname,
    type: "file",
    path: req.file.path,
    parent: req.body.parent || null,
    user: req.user._id,
  });
  res.json(item);
});

// Get items in folder
router.get("/items/:parentId?", auth, async (req, res) => {
  const items = await Item.find({
    parent: req.params.parentId || null,
    user: req.user._id,
  });
  res.json(items);
});

// Delete item
router.delete("/:id", auth, async (req, res) => {
  await Item.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  res.json({ success: true });
});
