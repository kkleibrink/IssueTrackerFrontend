import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const Landing = ({ auth }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/dashboard");
    }
  }, [auth.isAuthenticated, navigate]);

  return (
    <div className="h-[75vh] flex items-center justify-center">
      <div className="text-center">
        <h4 className="font-bold">
          <span className="text-black">Track</span> user issues with style.{" "}
          <span className="font-mono"></span> Issue Tracker
        </h4>
        <p className="text-gray-800 text-lg">
          Login to see the magic happen
        </p>
        <div className="mt-4 space-x-4">
          <Link
            to="/register"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="bg-white hover:bg-gray-100 text-black font-semibold py-2 px-6 rounded"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
