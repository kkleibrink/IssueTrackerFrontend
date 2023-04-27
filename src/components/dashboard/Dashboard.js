import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Dashboard = ({ auth, logoutUser }) => {
  let location = useLocation();
  let navigate = useNavigate();
  let params = useParams();
  const onLogoutClick = e => {
    e.preventDefault();
    logoutUser();
    navigate('/login')
  };

  const { user } = auth;

  return (
    <div className="min-h-screen flex flex-col items-center py-12 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">
        Welcome, {user.name.split(" ")[0]}!
      </h1>
      <div className="flex flex-wrap gap-4 mb-8">
        <Link to="/add" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          Submit New Issue
        </Link>
        <Link to="/issues" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          View All Issues
        </Link>
        {/* Conditionally render the User Management button if the user is an admin */}
        {user.role === 'admin' && (
          <Link to="/usermanagement" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            User Management
          </Link>
        )}
      </div>
      <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded" onClick={onLogoutClick}>
        Logout
      </button>
    </div>
  );
};

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
