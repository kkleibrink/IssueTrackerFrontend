import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Login = ({ auth, loginUser, errors }) => {
  let location = useLocation();
  let navigate = useNavigate();
  let params = useParams();
  const [state, setState] = useState({
    email: "",
    password: "",
    errors: {}
  });

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/issues");
    }
  }, [auth.isAuthenticated, navigate]);

  useEffect(() => {
    setState(prevState => ({ ...prevState, errors: errors }));
    if (auth.isAuthenticated) {
      navigate("/issues");
    }
  }, [auth.isAuthenticated, errors, navigate]);

  const onChange = e => {
    setState({ ...state, [e.target.id]: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: state.email.toLowerCase(),
      password: state.password
    };
    loginUser(userData);
  };


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login to your account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            Register
          </Link>
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form noValidate onSubmit={onSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  onChange={onChange}
                  value={state.email}
                  error={state.errors.email}
                  id="email"
                  type="email"
                  className={classnames("appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm", {
                    "border-red-500": state.errors.email || state.errors.emailnotfound,
                  })}
                />
              </div>
              <span className="text-red-500 text-xs">
                {state.errors.email}
                {state.errors.emailnotfound}
              </span>
            </div>

            <div className="mt-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
                          <div className="mt-1">
                <input
                  onChange={onChange}
                  value={state.password}
                  error={state.errors.password}
                  id="password"
                  type="password"
                  className={classnames("appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm", {
                    "border-red-500": state.errors.password || state.errors.passwordincorrect,
                  })}
                />
              </div>
              <span className="text-red-500 text-xs">
                {state.errors.password}
                {state.errors.passwordincorrect}
              </span>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
