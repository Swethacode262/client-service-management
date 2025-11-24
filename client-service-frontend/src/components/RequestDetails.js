import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './RequestDetails.css';

function RequestDetails() {
  const { id } = useParams();
  const [request, setRequest] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/request/${id}`)
      .then(res => setRequest(res.data))
      .catch(err => alert('Error fetching request details'));
  }, [id]);

  if (!request) return <p>Loading request details...</p>;

  return (
    <div className="request-details-container">
      <h2>Request Details</h2>
      <div className="request-card">
        <p><strong>ID:</strong> {request.id}</p>
        <p><strong>Client ID:</strong> {request.clientId}</p>
        <p><strong>Request Details:</strong> {request.requestDetails}</p>
        <p><strong>Status:</strong> <span className={`status ${request.status.toLowerCase()}`}>{request.status}</span></p>
      <Link
  to={JSON.parse(localStorage.getItem("currentUser"))?.role === "ADMIN" ? "/requests" : "/my-requests"}
  className="back-btn"
>
  Back to Requests
</Link>

      </div>
    </div>
  );
}

export default RequestDetails;
