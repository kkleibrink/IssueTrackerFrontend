import React, { useState, useEffect } from "react";
import { createIssue } from "./api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const Dropdown = ({ name, value, onChange, options, openDropdown, onToggle }) => {
  const open = openDropdown === name; // Check if the current dropdown should be open


  const handleClick = () => {
    onToggle(name);
  };
  //const [open, setOpen] = useState(false);

  const handleOptionClick = (option) => {
    onChange({ target: { name, value: option } });
  
  };
  const handleMouseEnter = (event) => {
    event.target.style.backgroundColor = "#F3F4F6"; // Set the background color when the mouse enters
  };

  const handleMouseLeave = (event) => {
    event.target.style.backgroundColor = ""; // Reset the background color when the mouse leaves
  };
 

  return (
    <div
    className="relative cursor-pointer border border-gray-300 rounded px-4 py-2 w-full"
    onClick={handleClick} // Use the handleClick function here
    >
      {value || "Select an option"}
      {open && (
        <ul
          className="absolute z-10 list-none p-0 m-0 bg-white w-full shadow"
        >
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option.value)}
              className={`px-4 py-2 border-b border-gray-200 ${
                index === options.length - 1 ? "border-none" : ""
              }`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

  // Access user data from the Redux store
  const IssueForm = () => {
    // Access user data from the Redux store
    const user = useSelector((state) => state.auth.user);
    console.log(user); //
    const initialIssueState = {
      id: "",
      title: "",
      description: "",
      priority: "Low",
      screenshot: "",
      category: "Piping",
      contact: {
        name: user?.name || "",
        email: user?.email || "",
      },
    };
  
    const [issue, setIssue] = useState(initialIssueState);
    const [openDropdown, setOpenDropdown] = useState("");
  
    // Callback function to be passed to Dropdown components
    const handleDropdownToggle = (name) => {
      if (openDropdown === name) {
        setOpenDropdown("");
      } else {
        setOpenDropdown(name);
      }
    };
  
    useEffect(() => {
      if (user) {
        setIssue((prevIssue) => ({
          ...prevIssue,
          contact: {
            ...prevIssue.contact,
            name: user.name || "",
            email: user.email || "",
          },
        }));
      } else {
        setIssue(initialIssueState);
      }
    }, [user]);
    useEffect(() => {
      setIssue((prevIssue) => ({ ...prevIssue, id: Date.now() }));
    }, []);
  
    useEffect(() => {
      console.log(issue.id);
    }, [issue.id]);
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      if (name.includes(".")) {
        const [property, nestedProperty] = name.split(".");
        setIssue({
          ...issue,
          [property]: { ...issue[property], [nestedProperty]: value },
        });
      } else {
        setIssue({ ...issue, [name]: value });
      }
    };
  
    const handleFileChange = (event) => {
      setIssue({ ...issue, screenshot: event.target.files[0] });
    };
  
    const navigate = useNavigate();
  
    const handleSubmit = (event) => {
      event.preventDefault();
      createIssue(issue)
        .then(() => {
          // reset the form after submitting
          setIssue({});
          navigate("/"); // redirect to the homepage
        })
        .catch((err) => {
          console.log(err);
        });
    };

  return (
    <form
      className="bg-white p-8 rounded shadow"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-semibold mb-6">Submit an Issue</h1>
      <div className="mb-4">
        <label className="font-semibold mb-2 block">Name:</label>
        <input
          className="border border-gray-300 rounded px-4 py-2 w-full"
          type="text"
          name="contact.name"
          value={issue.contact.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="font-semibold mb-2 block">Email:</label>
        <input
          className="border border-gray-300 rounded px-4 py-2 w-full"
          type="email"
          name="contact.email"
          value={issue.contact.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="font-semibold mb-2 block">Issue Description:</label>
        <textarea
          className="border border-gray-300 rounded px-4 py-2 w-full"
          name="description"
          value={issue.description}
          onChange={handleChange}
          required
          rows="10"
        />
      </div>

      <div className="mb-4">
        <label className="font-semibold mb-2 block">Category:</label>
        <Dropdown
          name="category"
          value={issue.category}
          onChange={handleChange}
          options={[
            { value: "Piping", label: "Piping" },
            { value: "Structural", label: "Structural" },
            { value: "Electrical", label: "Electrical" },
            { value: "RDB", label: "RDB" },
            { value: "Other", label: "Other" },
          ]}
          openDropdown={openDropdown}
          onToggle={handleDropdownToggle}
          required
        />
      </div>
 
      <div className="mb-4">
        <label className="font-semibold mb-2 block">Priority:</label>
        <Dropdown
          name="priority"
          value={issue.priority}
          onChange={handleChange}
          options={[
            { value: "Low", label: "Low" },
            { value: "Medium", label: "Medium" },
            { value: "High", label: "High" },
          ]}
          openDropdown={openDropdown}
          onToggle={handleDropdownToggle}
          required
        />
      </div>

      <div className="mb-4">
        <label className="font-semibold mb-2 block ">Screenshot:</label>
        <input
          className="border border-gray-300 rounded px-4 py-2 w-full"
          type="file"
          name="screenshot"
          onChange={handleFileChange}
        />
      </div>
      <input
        className="bg-green-500 text-white px-6 py-2 rounded cursor-pointer hover:bg-green-600"
        type="submit"
        value="Submit Issue"
      />
    </form>
  );
};

export default IssueForm;

