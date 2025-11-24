import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./MyRequests.css"; 


function MyRequests() {
  const [requests, setRequests] = useState([]);

  
  const loggedInUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/request/all")
      .then((res) => {
        
        const myRequests = res.data.filter(
          (r) => Number(r.clientId) === Number(loggedInUser.id)
        );
        setRequests(myRequests);
      })
      .catch((err) => console.error("Error fetching requests:", err));
  }, [loggedInUser.id]);

  return (
    <div className="my-requests-container">
      <h2>My Requests</h2>

      {requests.length === 0 ? (
        <p>You have not created any requests yet.</p>
      ) : (
        <table className="my-requests-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>
                  <span
                    className={`badge ${
                      r.status === "OPEN"
                        ? "open"
                        : r.status === "IN_PROGRESS"
                        ? "progress"
                        : "closed"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td>
                  <Link to={`/requests/${r.id}`} className="btn view">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyRequests;
