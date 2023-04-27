import { getIssues } from "./api";
import IssueCard from "./IssueCard";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./IssueList.css";

const IssueList = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    getIssues().then((data) => {
      setIssues(data);
    });
  }, []);

  const categories = [
    { title: "Piping", color: "#E74C3C" },
    { title: "Electrical", color: "#F1C40F" },
    { title: "Structural", color: "#3498DB" },
    { title: "RDB", color: "#9B59B6" },
    { title: "Other", color: "#1ABC9C" },
  ];

  const filterIssuesByCategory = (category) => {
    return issues.filter((issue) => issue.category === category.title);
  };

  return (
    <div className="issue-list">
      <h1>Open Issues</h1>
      <Link to="/add">
        <button className="create-button">Create New Issue</button>
      </Link>
      <div className="categories">
        {categories.map((category) => (
          <div className="category-column" key={category.title}>
            <h2 className="category-title" style={{ backgroundColor: category.color }}>{category.title}</h2>
            {filterIssuesByCategory(category).map((issue) => (
              <div className="issue-card" key={issue._id}>
                <IssueCard issue={issue} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IssueList;
