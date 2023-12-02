import React, { useState, useEffect } from "react";
import "./App.css";
import { AiOutlineDelete, AiOutlineSave } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";

import UserTableRow from "./components/UserTableRow";
import PaginationButton from "./components/PaginationButton";

const API_URL =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editState, setEditState] = useState({});


  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
      });
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  };



  const handleSelectAll = (event) => {
    const checked = event.target.checked;
    const currentPageUsers = filteredUsers.slice(
      (currentPage - 1) * 10,
      currentPage * 10
    );
    // Update the isSelected property of all users on the current page
    setFilteredUsers(
      filteredUsers.map((user) => {
        if (currentPageUsers.includes(user)) {
          return { ...user, isSelected: checked };
        }
        return user;
      })
    );
  };

  const handleSelectUser = (userId, checked) => {
    setFilteredUsers(
      filteredUsers.map((user) =>
        user.id === userId ? { ...user, isSelected: checked } : user
      )
    );
  };

  const handleDeleteSelected = () => {
    // Filter out selected users
    const remainingUsers = filteredUsers.filter((user) => !user.isSelected);
    // Update filtered users
    setFilteredUsers(remainingUsers);
    // Recalculate total pages
    const totalPages = Math.ceil(remainingUsers.length / 10);
    // Update current page if necessary
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
    // Update page numbers and navigation
    handlePageChange("first");
  };

  // 
  const totalPages = Math.ceil(filteredUsers.length / 10);

  const handlePageChange = (direction, pageNumber) => {
    let newPage = currentPage;
    switch (direction) {
      case "first":
        newPage = 1;
        break;
      case "previous":
        newPage = Math.max(1, currentPage - 1);
        break;
      case "next":
        newPage = Math.min(totalPages, currentPage + 1);
        break;
      case "last":
        newPage = totalPages;
        break;
      case "number":
        newPage = parseInt(pageNumber);
        break;
      default:
        break;
    }
    setCurrentPage(newPage);
  };

  // Render pagination buttons within the Pagination component
  const paginationButtons = (
    <div className="flex space-x-2">
      <button
        className={`btn btn-primary ${currentPage === 1 ? "disabled" : ""}`}
        onClick={() => handlePageChange("first")}
      >
        &lt;&lt; 
      </button>
      <button
        className={`btn btn-primary ${currentPage === 1 ? "disabled" : ""}`}
        onClick={() => handlePageChange("previous")}
      >
        &lt; 
      </button>
      {currentPage > 2 && (
        <PaginationButton
          pageNumber={currentPage - 2}
          handlePageChange={handlePageChange}
        />
      )}
      {currentPage > 1 && (
        <PaginationButton
          pageNumber={currentPage - 1}
          handlePageChange={handlePageChange}
        />
      )}
      <PaginationButton
        pageNumber={currentPage}
        handlePageChange={handlePageChange}
      />
      {currentPage < totalPages && (
        <PaginationButton
          pageNumber={currentPage + 1}
          handlePageChange={handlePageChange}
        />
      )}
      {currentPage < totalPages - 1 && (
        <PaginationButton
          pageNumber={currentPage + 2}
          handlePageChange={handlePageChange}
        />
      )}
      <button
        className={`btn btn-primary ${
          currentPage === Math.ceil(filteredUsers.length / 10) ? "disabled" : ""
        }`}
        onClick={() => handlePageChange("next")}
      >
        &gt;
      </button>
      <button
        className={`btn btn-primary ${
          currentPage === Math.ceil(filteredUsers.length / 10) ? "disabled" : ""
        }`}
        onClick={() => handlePageChange("last")}
      >
        &gt;&gt;
      </button>
    </div>
  );

  const handleEdit = (id) => {
    setEditState({ ...editState, [id]: true });
  };
  
  const handleSave = (id) => {
    // Update user data in original state based on edited values
    // ...
  
    setEditState({ ...editState, [id]: false });
  };
  
 
  const handleEditChange = (id, value, field) => {
    // Update the specific user property based on the field
    setUsers(users.map((user) => (user.id === id ? { ...user, [field]: value } : user)));
  };

  const userLists = filteredUsers.slice((currentPage - 1) * 10, currentPage * 10).map((user) => (
    <UserTableRow
      key={user.id}
      user={user}
      editState={editState}
      handleSelectUser={handleSelectUser}
      handleEdit={handleEdit}
      handleSave={handleSave}
      handleEditChange={handleEditChange}
      handleDeleteSelected={handleDeleteSelected}
    />
  ))
  
  


  return (
    <div className="container mx-auto px-2 py-2">
      {/* <h1 className="text-2xl font-bold mb-4">Users</h1> */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          className=" rounded-md border-gray-300 px-4 py-2 mr-2 outline-none border"
          onChange={handleSearch}
        />
        <div
          className="
        bg-red-500 p-1"
        >
          <AiOutlineDelete
            className="text-white text-2xl  cursor-pointer"
            onClick={handleDeleteSelected}
          />
        </div>

        {/* <button className="btn btn-primary">Search</button> */}
      </div>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={filteredUsers.every((user) => user.isSelected)}
                onChange={handleSelectAll}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{userLists}</tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <span>
          Page {currentPage} of {Math.ceil(filteredUsers.length / 10)}
        </span>
        {paginationButtons}
      </div>
    </div>
  );
}

export default App;

