import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getIssue, updateIssue } from './api';
import './IssuePage.css';
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

  return (
    <div className="issue-container">
      <h2 className="issue-title">{issue.title}</h2>
      <p className="issue-description">{issue.description}</p>
      <p className="issue-priority">Priority: {issue.priority}</p>
      <p className="issue-category">Category: {issue.category}</p>
      {issue.contact && (
        <p className="issue-contact">
          Contact: {issue.contact.name} - {issue.contact.email}
        </p>
      )}
      {issue.screenshot && (
        <div className="issue-screenshot">
          <img src={issue.screenshot} alt="Screenshot" />
        </div>
      )}
      {auth.user.role === 'admin' && (
        <div className="issue-actions">
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleClose}>Close</button>
          <button onClick={handleAddResponse}>Add response</button>
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
