import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/authActions';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ auth, logoutUser }) => {
  const navigate = useNavigate();
  const onLogoutClick = e => {
    e.preventDefault();
    logoutUser();
    navigate('/login');
  };

  const { isAuthenticated, user } = auth;

  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-6 py-3">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center">
            {isAuthenticated && (
              <span className="text-gray-800 font-medium">
                Logged in as: {user.name.split(' ')[0]}
              </span>
            )}
          </div>
          <Link
            to="/"
            className="text-gray-800 text-2xl font-semibold mx-auto"
          >
            <i className="material-icons">code</i>
            Design Track
          </Link>
          <div className="flex items-center">
            {isAuthenticated ? (
              <button
                onClick={onLogoutClick}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
              >
                Logout
              </button>
            ) : (
              <div className="w-24"></div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
