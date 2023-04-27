import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const Landing = ({ auth, router }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
    navigate("/dashboard");
    }
    }, [auth.isAuthenticated, router]);

  return (
    <div style={{ height: "75vh" }} className="container valign-wrapper">
      <div className="row">
        <div className="col s12 center-align">
          <h4>
            <b>Track</b> user issues with style.{" "}
            <span style={{ fontFamily: "monospace" }}>CNRL</span> Issue Tracker
          </h4>
          <p className="flow-text grey-text text-darken-1">
            Login to see the magic happen
          </p>
          <br />
          <div className="col s6">
            <Link
              to="/register"
              style={{
                width: "140px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
              }}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Register
            </Link>
          </div>
          <div className="col s6">
            <Link
              to="/login"
              style={{
                width: "140px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
              }}
              className="btn btn-large btn-flat waves-effect white black-text"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
