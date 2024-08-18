const express = require("express");
const cors = require("cors");
const BlogModel = require("./model"); 
require("./connection")
const app = express();

app.use(express.json());
app.use(cors());

app.post("/add", async (req, res) => {
  try {
    const { title, content, img_url } = req.body;
    const newBlog = new BlogModel({ title, content, img_url });
    await newBlog.save();
    res.status(201).send({ message: "Blog post added successfully", newBlog });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error adding blog post" });
  }
});

app.get("/get", async (req, res) => {
  try {
    let data = await BlogModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error fetching blog posts" });
  }
});

app.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updatedBlog = await BlogModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBlog) {
      return res.status(404).send({ message: "Blog post not found" });
    }
    res.send({ message: "Blog post updated successfully", updatedBlog });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error updating blog post" });
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedBlog = await BlogModel.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).send({ message: "Blog post not found" });
    }
    res.send({ message: "Blog post deleted successfully", deletedBlog });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error deleting blog post" });
  }
});

app.listen(3001, () => {
  console.log('3001 is up and running');
});
