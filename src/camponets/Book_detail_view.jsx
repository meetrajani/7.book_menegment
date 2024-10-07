import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import app from "../firebaseConfig"; // Firebase config
import { getDatabase, ref, get, child } from "firebase/database";

const Book_detail_view = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchBookDetail();
  }, [id]);

  const fetchBookDetail = async () => {
    try {
      const db = getDatabase(app);
      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, `users/blogs/${id}`));
      if (snapshot.exists()) {
        setBook(snapshot.val());
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error("Error fetching book data: ", error);
    }
  };

  return (
    <div className="container">
      {book ? (
        <div className="card mt-5">
          <div className="row g-0">
            <div className="col-md-4 border-end d-flex justify-content-center">
              <img
                src={book.image}
                className="img-fluid rounded-start"
                alt={book.image}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">Price: {book.price}</p>
                <div className="d-bolk">
                <a href={book.url} className="card-text text-decoration-none">
                  <small className="text-body-secondary fs-5">
                    Red this Book
                  </small>
                </a>
                </div>
                <Link className="text-decoration-none btn btn-primary mt-5" to={"/"} >Go Back</Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading book details...</p>
      )}
    </div>
  );
};

export default Book_detail_view;
