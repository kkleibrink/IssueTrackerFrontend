import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useLocation, useNavigate, useParams } from "react-router-dom";


const PrivateRoute = ({ children, auth }) => {
  let location = useLocation();
  let navigate = useNavigate();
  let params = useParams();
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/login");
    }
  }, [auth.isAuthenticated]);

  return auth.isAuthenticated ? children : null;
};

PrivateRoute.propTypes = {
auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);