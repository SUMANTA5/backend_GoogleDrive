const Item = require("../models/Item");
// Create a folder
const folder = async (req, res) => {
  try {
    const item = await Item.create({
      folderName: req.body.folderName,
      type: "folder",
      parent: req.body.parent || null,
      user: req.user._id,
    });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Upload a file
const file = async (req, res) => {
  try {
    const item = await Item.create({
      folderName: req.body.folderName || null,
      name: req.file.originalname,
      type: "file",
      path: req.file.path,
      parent: req.body.parent === "null" ? null : req.body.parent || null, // Fix to handle 'null' correctly
      user: req.user._id,
    });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: "File upload error", error: err.message });
  }
};

// const getItemsFile = async (req, res) => {
//   try {
//     const items = await Item.find({
//       parent: req.params.parentId || null,
//       user: req.user._id,
//     });
//     res.json(items);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching items", error: err.message });
//   }
// };
const getItemsFilesByUser = async (req, res) => {
  try {

    const query = { user: req.user._id };

      query.type = "folder";
    const items = await Item.find(query);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching items", error: err.message });
  }
};

const getItemsFilesDetailsByUser = async (req, res) => {
  try {

    const query = { user: req.user._id };


    if (req.body.folderName) {
      query.folderName = req.body.folderName;
    }


    const items = await Item.find(query);


    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching items", error: err.message });
  }
};
const getItemsFileByName = async (req, res) => {
  try {

    const query = { user: req.user._id };

    if (req.body.name) {
      query.name = req.body.name;
    }


    if (req.body.folderName) {
      query.folderName = req.body.folderName;
    }

    const item = await Item.findOne(query);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }


    if (item.type === "file") {
      res.json({ path: item.path });
    } else {
      res.status(400).json({ message: "Item is not a file" });
    }

  } catch (err) {
    res.status(500).json({ message: "Error fetching item", error: err.message });
  }
};



// Delete an item
const deleteItem = async (req, res) => {
  try {
    await Item.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Error deleting item", error: err.message });
  }
};

const deleteFilesByFolderName = async (req, res) => {
  try {
    const result = await Item.deleteMany({
      folderName: req.body.folderName,
      user: req.user._id,
    });

    res.json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({ message: "Error deleting items", error: err.message });
  }
};


module.exports = {
  folder,
  file,
  getItemsFileByName,
  getItemsFilesDetailsByUser,
  getItemsFilesByUser,
  deleteItem,
  deleteFilesByFolderName
};
