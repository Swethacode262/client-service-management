import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./RequestsList.css";

function RequestsList() {
  const [requests, setRequests] = useState([]);

  const loggedInUser = JSON.parse(localStorage.getItem("currentUser"));

  
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/request/all")
      .then((res) => setRequests(res.data))
      .catch((err) => console.error("Error fetching requests:", err));
  }, []);

  
  const filteredRequests = requests.filter((r) =>
    loggedInUser.role === "ADMIN" ? true : r.clientId === loggedInUser.id
  );

  const deleteRequest = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/request/delete/${id}`);
      setRequests(requests.filter((r) => r.id !== id));
    } catch (error) {
      console.error("Error deleting request:", error);
      alert("Failed to delete request. Check console for details.");
    }
  };

  
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:8080/api/request/update-status/${id}/${status}?userId=${loggedInUser.id}`
      );

      setRequests(
        requests.map((r) =>
          r.id === id ? { ...r, status: status.toUpperCase() } : r
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Check console for details.");
    }
  };

  return (
    <div className="req-container">
      <h2 className="req-title">Service Requests</h2>

      <table className="req-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Client ID</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredRequests.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.clientId}</td>

              {/* Status Badge */}
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

              {/* Actions */}
              <td>
                <Link to={`/requests/${r.id}`} className="btn view">
                  View
                </Link>

                {/* Only admins can change status and delete */}
                {loggedInUser.role === "ADMIN" && (
                  <>
                    <button
                      className="btn blue"
                      onClick={() => updateStatus(r.id, "IN_PROGRESS")}
                    >
                      In Progress
                    </button>

                    <button
                      className="btn green"
                      onClick={() => updateStatus(r.id, "CLOSED")}
                    >
                      Close
                    </button>

                    <button
                      className="btn red"
                      onClick={() => deleteRequest(r.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RequestsList;
