import axios from 'axios';

const baseUrl = 'http://localhost:3001/api';

export const getIssues = () => {
    return axios.get(`${baseUrl}/issues`)
        .then(response => response.data);
};

export const getIssue = (id) => {
    return axios.get(`${baseUrl}/issues/${id}`)
        .then(response => response.data);
};

export const createIssue = (data) => {
    return axios.post(`${baseUrl}/issues`, data, {headers: {'Content-Type': 'application/json'}})
        .then(response => response.data);
};

export const updateIssue = (id, data) => {
    return axios.put(`${baseUrl}/issues/${id}`, data)
        .then(response => response.data);
};

export const deleteIssue = (id) => {
      console.log(`${baseUrl}/issues/${id}`);
        return axios.delete(`${baseUrl}/issues/${id}`)
            .then(response => response.data);
    }


    export const getAllUsers = async () => {
        const token = localStorage.getItem("jwtToken");
        console.log("Token:", token);
        const response = await fetch(`${baseUrl}/users`, {
          headers: {
            Authorization: token,
          },
        });
      
        if (!response.ok) {
          throw new Error(`Error fetching users: ${response.statusText}`);
        }
      
        return await response.json();
      };
      export const updateUserRole = async (userId, newRole) => {
        const token = localStorage.getItem("jwtToken");
        const response = await fetch(`${baseUrl}/users/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`, 
          },
          body: JSON.stringify({ role: newRole }),
        });
      
        console.log('User ID:', userId);
        console.log('New Role:', newRole);
        console.log('Token:', token);
      
        if (!response.ok) {
          throw new Error(`Error updating user role: ${response.statusText}`);
        }
      
        return await response.json();
      };

    

