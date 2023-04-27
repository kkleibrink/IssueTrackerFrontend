import React from 'react';
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import IssueList from './components/IssueList';
import IssueForm from './components/IssueForm';
import Navbar from "./components/Layout/Navbar";
import Landing from "./components/Layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import IssuePage from "./components/IssuePage";
import UserManagement from './components/UserManagement';
import { Provider } from "react-redux";
import store from "./store"; 

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
  // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logoutUser());
      // Redirect to login
      window.location.href = "./login";
    }
  }

const App = () => {
    return (
      
      <Provider store={store}>
      <BrowserRouter>
      <Navbar />
      <Routes>
      <Route path="/" exact element={<Landing />} key="home" />
      <Route path="/register" exact element={<Register />} key="register" />
      <Route path="/login" element={<Login />} key="login" />
      <Route path="/issues" element={<PrivateRoute><IssueList /></PrivateRoute>} key="issues"/>
      <Route path="/issue/:issueId" element={<PrivateRoute><IssuePage /></PrivateRoute>} key="issue"/>
      <Route path="/add" element={<PrivateRoute><IssueForm /></PrivateRoute>} key="add"/>
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} key="dashboard"/>
      <Route path="/usermanagement" element={<PrivateRoute><UserManagement /></PrivateRoute>} key="usermanagement"/>
      </Routes>
      </BrowserRouter>
      </Provider>


        
    );
}


export default App;

