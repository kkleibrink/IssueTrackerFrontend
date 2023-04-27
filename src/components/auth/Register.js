import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import { useNavigate } from "react-router-dom";

const Register = ({ registerUser, auth, errors }) => {
  let navigate = useNavigate();

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  });

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/dashboard");
    }
  }, [auth.isAuthenticated]);

  useEffect(() => {
    if (errors) {
      setState(prevState => ({ ...prevState, errors }));
    }
  }, [errors]);

  const onChange = e => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: state.name,
      email: state.email,
      password: state.password,
      password2: state.password2
    };
    registerUser(newUser, () => navigate("/login"));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Login
          </Link>
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form noValidate onSubmit={onSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="mt-1">
                <input
                  onChange={onChange}
                  value={state.name}
                  error={state.errors.name}
                  id="name"
                  type="text"
                  className={classnames("appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm", {
                    "border-red-500": state.errors.name,
                  })}
                />
              </div>
              <span className="text-red-500 text-xs">{state.errors.name}</span>
            </div>

            <div className="mt-6">
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
                  className={classnames("appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm", {"border-red-500": state.errors.email,
                })}
                />
                </div>
                <span className="text-red-500 text-xs">{state.errors.email}</span>
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
                "border-red-500": state.errors.password,
              })}
            />
          </div>
          <span className="text-red-500 text-xs">{state.errors.password}</span>
        </div>

        <div className="mt-6">
          <label htmlFor="password2" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <div className="mt-1">
            <input
              onChange={onChange}
              value={state.password2}
              error={state.errors.password2}
              id="password2"
              type="password"
              className={classnames("appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm", {
                "border-red-500": state.errors.password2,
              })}
            />
          </div>
          <span className="text-red-500 text-xs">{state.errors.password2}</span>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
);
};

Register.propTypes = {
registerUser: PropTypes.func.isRequired,
auth: PropTypes.object.isRequired,
errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
auth: state.auth,
errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(Register);
                
                   
