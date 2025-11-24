import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateRequest.css"; 

function CreateRequest() {
  const [details, setDetails] = useState("");
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!details.trim()) {
      alert("Please enter request details");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/request/create", {
        clientId: currentUser.id,
         createdBy: currentUser.id,
        requestDetails: details,
        status: "OPEN",
      });
      alert("Request created successfully");
      navigate("/my-requests");
    } catch (error) {
      console.error(error);
      alert("Failed to create request");
    }
  };

  return (
    <div className="create-request-container">
      <div className="create-request-box">
        <h2>Create New Request</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Enter your request details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
          <button type="submit">Submit Request</button>
        </form>
      </div>
    </div>
  );
}

export default CreateRequest;
