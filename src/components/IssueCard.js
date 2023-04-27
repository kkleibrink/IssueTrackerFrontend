import './IssueList.css';
import { Link } from 'react-router-dom';

const IssueCard = ({ issue }) => {
  return (
    <Link to={`/issue/${issue._id}`} className="issue-card-container">
      <div className="issue-card-body">
        <h3 className="issue-card-title">{issue.title}</h3>
        <p className="issue-card-description">{issue.description}</p>
        <p className="issue-card-priority">Priority: {issue.priority}</p>
        <p className="issue-card-category">Category: {issue.category}</p>
        {issue.contact && (
          <p className="issue-card-contact">
            Contact: {issue.contact.name} - {issue.contact.email}
          </p>
        )}
      </div>
    </Link>
  );
};

export default IssueCard;