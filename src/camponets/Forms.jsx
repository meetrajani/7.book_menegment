import React, { useState, useEffect } from "react";
import app from "../firebaseConfig";
import {
  getDatabase,
  ref,
  get,
  child,
  push,
  update,
  remove,
} from "firebase/database";
import { Link } from "react-router-dom";

const Forms = () => {
  const [data, setData] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    price: "",
    image: "",
    url: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null); // ID of the post being edited

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch Data from Firebase
  const fetchData = async () => {
    try {
      const db = getDatabase(app);
      const dbRef = ref(db, "users/blogs");
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const dataList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setData(dataList);
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // Add or Update blog post in Firebase
  const handleAddOrUpdatePost = async (e) => {
    e.preventDefault();
    const db = getDatabase(app);
    const dbRef = ref(db, "users/blogs");

    try {
      if (editMode) {
        // Update existing post
        const updateRef = ref(db, `users/blogs/${editId}`);
        await update(updateRef, newPost);
        setEditMode(false);
        setEditId(null);
      } else {
        // Add new post
        await push(dbRef, newPost);
      }

      // Reset form fields
      setNewPost({
        title: "",
        price: "",
        image: "",
        url: "",
      });

      // Refresh blog list
      fetchData();
    } catch (error) {
      console.error("Error adding or updating post: ", error);
    }
  };

  // Load post into form for editing
  const handleEdit = (post) => {
    setNewPost({
      title: post.title,
      price: post.price,
      image: post.image,
      url: post.url,
    });
    setEditMode(true);
    setEditId(post.id);
  };

  // Delete post from Firebase
  const handleDelete = async (id) => {
    try {
      const db = getDatabase(app);
      const postRef = ref(db, `users/blogs/${id}`);
      await remove(postRef);
      fetchData(); // Refresh blog list after deletion
    } catch (error) {
      console.error("Error deleting post: ", error);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container">
        <div className="d-flex justify-content-between my-3">
        <h3 className="">Book Add</h3>
        <Link to={"/"} className="btn btn-primary px-3">All Book List</Link>
        </div>

      {/* Form to add or update blog post */}
      <form className="row" onSubmit={handleAddOrUpdatePost}>
        <div className="col-6">
          <input
            className="form-control"
            type="text"
            name="title"
            value={newPost.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
        </div>
        <div className="col-6">
          <input
            className="form-control"
            type="text"
            name="price"
            value={newPost.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />
        </div>
        <div className="p-2">
          <input
            className="form-control mb-2"
            type="text"
            name="image"
            value={newPost.image}
            onChange={handleChange}
            placeholder="Image"
            required
          />
          <input
            className="form-control"
            type="text"
            name="url"
            value={newPost.url}
            onChange={handleChange}
            placeholder="URL"
            required
          />
        </div>
        <div className="">
          <button className="btn btn-primary px-3" type="submit">
            {editMode ? "Update Post" : "Add Post"}
          </button>
        </div>
      </form>

      {/* Display the list of blogs */}
      <div>
        <div className="row mt-4">
          {data.length > 0 ? (
            data.map((post) => (
              <div
                className="card col-4 m-3"
                key={post.id}
                style={{ width: "18rem" }}
              >
                <Link to={post.url}>
                  <img
                    src={post.image}
                    className="card-img-top card_img"
                    alt="img"
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">Price: {post.price}</p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <button
                    className="btn btn-primary mx-1"
                    onClick={() => handleEdit(post)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger mx-1"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Loding .... </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Forms;
