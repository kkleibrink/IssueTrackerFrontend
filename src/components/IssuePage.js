import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getIssue, updateIssue } from './api';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Issue = ({ auth }) => {
  const { issueId } = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);

  useEffect(() => {
    const fetchIssue = async () => {
      const fetchedIssue = await getIssue(issueId);
      setIssue(fetchedIssue);
    };
    fetchIssue();
  }, [issueId]);

  const handleEdit = () => {
    navigate(`/edit/${issue._id}`);
  };

  const handleClose = async () => {
    await updateIssue(issue._id, { status: 'closed' });
    navigate('/issues');
  };

  const handleAddResponse = () => {
    navigate(`/response/${issue._id}`);
  };

  if (!issue) {
    return <div>Loading...</div>;
  }

  const isAdmin = auth.user.role === 'admin';
  const isCreator = issue.contact && auth.user.name === issue.contact.name;
  

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold text-gray-900">{issue.title}</h2>
      <p className="mt-4 text-lg text-gray-500">{issue.description}</p>
      <p className="mt-2 text-lg text-gray-600">Priority: {issue.priority}</p>
      <p className="mt-2 text-lg text-gray-600">Category: {issue.category}</p>
      {issue.contact && (
        <p className="mt-2 text-lg text-gray-600">
          Contact: {issue.contact.name} - {issue.contact.email}
        </p>
      )}
      {issue.screenshot && (
        <div className="mt-4">
          <img src={issue.screenshot} alt="Screenshot" className="rounded-lg shadow-lg" />
        </div>
      )}

      {isAdmin && (
        <div className="mt-4">
       <button
  onClick={handleEdit}
  style={{
    backgroundColor: "blue",
    color: "white",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "0.25rem",
    transition: "background-color 0.3s ease-in-out",
    marginRight: "1rem",
  }}
  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white hover:bg-blue-700"
>
  Edit
</button>

<button
  onClick={handleClose}
  style={{
    backgroundColor: "blue",
    color: "white",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "0.25rem",
    transition: "background-color 0.3s ease-in-out",
    marginRight: "1rem",
  }}
  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white hover:bg-blue-700"
>
  Close
</button>

<button
  onClick={handleAddResponse}
  style={{
    backgroundColor: "blue",
    color: "white",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "0.25rem",
    transition: "background-color 0.3s ease-in-out",
  }}
  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white hover:bg-blue-700"
>
  Add response
</button>


        </div>
      )}

      {isCreator && !isAdmin && (
        <div className="mt-4">
          <button
            onClick={handleClose}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue hover:bg-darkblue"
          >
            Close
          </button>
          <button
            onClick={handleAddResponse}
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue hover:bg-darkblue"
          >
            Add response
          </button>
          </div>
  )}

</div>
);
};

Issue.propTypes = {
auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
auth: state.auth,
});

export default connect(mapStateToProps)(Issue);
