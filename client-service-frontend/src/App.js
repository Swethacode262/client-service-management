import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './components/Home'; 
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import RequestsList from './components/RequestsList';
import CreateRequest from './components/CreateRequest';
import RequestDetails from './components/RequestDetails';
import MyRequests from './components/MyRequests';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  {/* Home page */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/requests" element={<RequestsList />} />
        <Route path="/requests/:id" element={<RequestDetails />} />
        
        <Route path="/my-requests" element={<MyRequests />} />


        <Route path="/create-request" element={<CreateRequest />} />
      </Routes>
    </Router>
  );
}

export default App;
