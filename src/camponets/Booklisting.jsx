import React, { useState, useEffect } from "react";
import app from "../firebaseConfig";
import { getDatabase, ref, get, child } from "firebase/database";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

const Booklisting = () => {
  const [data, setData] = useState([]); // Full book data
  const [searchTerm, setSearchTerm] = useState(""); // Search term entered by user
  const [filteredData, setFilteredData] = useState([]); // Filtered data based on search

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);

  useEffect(() => {
    // Filter the data based on searchTerm
    setFilteredData(
      data.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, data]);

  // Fetch Data from Firebase
  const fetchData = async () => {
    try {
      const db = getDatabase(app);
      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, "users/blogs"));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const dataList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setData(dataList);
        setFilteredData(dataList); 
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <div className="container">
      <div className="mt-3 d-flex justify-content-between">
        <h3>Book List</h3>
        <Link to={"/forms"} className="btn btn-primary px-3">
          Add Book
        </Link>
      </div>

      <div className="input-group my-3">
        <button className="input-group-text" id="basic-addon1">
          <IoSearch />
        </button>
        <input
          type="text"
          className="form-control"
          placeholder="Search by Title"
          aria-label="Search"
          aria-describedby="basic-addon1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm as the user types
        />
      </div>

      <div className="row">
        {filteredData.length > 0 ? (
          filteredData.map((post) => (
            <div
              className="card col-4 m-3"
              key={post.id}
              style={{ width: "18rem" }}
            >
              <Link to={`/book/${post.id}`}>
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
              <div className="card-footer">
                <Link to={`/book/${post.id}`} className="btn btn-primary">
                  Open Book
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>Loading ...</p>
        )}
      </div>
    </div>
  );
};

export default Booklisting;
