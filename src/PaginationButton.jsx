import React, { useState, useEffect } from "react";
import "./App.css";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import PaginationButton from "./PaginationButton";


const API_URL =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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

  // const handleSelectAll = event => {
  //   const checked = event.target.checked;
  //   setFilteredUsers(
  //     filteredUsers.slice((currentPage - 1) * 10, currentPage * 10).map(user => ({ ...user, isSelected: checked }))
  //   );
  // };

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
  // const handleSelectAll = (event) => {
  //   const checked = event.target.checked;
  //   if (checked) {
  //     // Mark all users on the current page as selected
  //     setFilteredUsers(
  //       filteredUsers.map((user) => ({ ...user, isSelected: true }))
  //     );
  //   } else {
  //     // Uncheck all users on the current page
  //     setFilteredUsers(
  //       filteredUsers.map((user) => ({ ...user, isSelected: false }))
  //     );
  //   }
  // };

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

 

  // const handleDeleteSelected = () => {
  //   // Implement delete selected functionality
  //   setFilteredUsers(filteredUsers.filter(user => !user.isSelected));
  // };

  // const handlePageChange = direction => {
  //   const totalPages = Math.ceil(filteredUsers.length / 10);
  //   let newPage = currentPage;
  //   switch (direction) {
  //     case 'first':
  //       newPage = 1;
  //       break;
  //     case 'previous':
  //       newPage = Math.max(1, currentPage - 1);
  //       break;
  //     case 'next':
  //       newPage = Math.min(totalPages, currentPage + 1);
  //       break;
  //     case 'last':
  //       newPage = totalPages;
  //       break;
  //     default:
  //       break;
  //   }
  //   setCurrentPage(newPage);
  // };

  // const handlePageChange = (direction) => {
  //   const totalPages = Math.ceil(filteredUsers.length / 10);
  //   let newPage = currentPage;
  //   switch (direction) {
  //     case "first":
  //       newPage = 1;
  //       break;
  //     case "previous":
  //       newPage = Math.max(1, currentPage - 1);
  //       break;
  //     case "next":
  //       newPage = Math.min(totalPages, currentPage + 1);
  //       break;
  //     case "last":
  //       newPage = totalPages;
  //       break;
  //     default:
  //       break;
  //   }
  //   // Check if page is valid
  //   if (newPage > totalPages) {
  //     newPage = totalPages;
  //   }
  //   setCurrentPage(newPage);
  // };
  // const totalPages = Math.ceil(filteredUsers.length / 10);

  // const handlePageChange = (direction, pageNumber) => {
  //   let newPage = currentPage;
  //   switch (direction) {
  //     case "first":
  //       newPage = 1;
  //       break;
  //     case "previous":
  //       newPage = Math.max(1, currentPage - 1);
  //       break;
  //     case "next":
  //       newPage = Math.min(totalPages, currentPage + 1);
  //       break;
  //     case "last":
  //       newPage = totalPages;
  //       break;
  //     case "number":
  //       newPage = parseInt(pageNumber);
  //       break;
  //     default:
  //       break;
  //   }
  //   setCurrentPage(newPage);
  // };
  

  // const PaginationButton = ({ pageNumber, handlePageChange }) => (
  //   <button
  //     className={`btn btn-primary ${pageNumber === currentPage ? "active" : ""}`}
  //     onClick={() => handlePageChange("number", pageNumber)}
  //   >
  //     {pageNumber}
  //   </button>
  // );
  
  // // Render pagination buttons within the Pagination component
  // const paginationButtons = (
  //   <div className="flex space-x-2">
  //     {/* Other navigation buttons */}
  //     {currentPage > 2 && <PaginationButton pageNumber={currentPage - 2} handlePageChange={handlePageChange} />}
  //     {currentPage > 1 && <PaginationButton pageNumber={currentPage - 1} handlePageChange={handlePageChange} />}
  //     <PaginationButton pageNumber={currentPage} handlePageChange={handlePageChange} />
  //     {currentPage < totalPages && <PaginationButton pageNumber={currentPage + 1} handlePageChange={handlePageChange} />}
  //     {currentPage < totalPages - 1 && <PaginationButton pageNumber={currentPage + 2} handlePageChange={handlePageChange} />}
  //     {/* Other navigation buttons */}
  //   </div>
  // );

  
  const usersList = filteredUsers
    .slice((currentPage - 1) * 10, currentPage * 10)
    .map((user) => (
      <tr key={user.id}>
        <td>
          <input
            type="checkbox"
            checked={user.isSelected}
            onChange={() => handleSelectUser(user.id, !user.isSelected)}
          />
        </td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td>
          <div className="flex flex-row justify-center items-center gap-4">
            <FaRegEdit className="border   text-4xl  p-1" />
            <AiOutlineDelete className="border text-red-400  text-4xl  p-1" />
          </div>
        </td>
      </tr>
    ));

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
        <tbody>{usersList}</tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <span>
          Page {currentPage} of {Math.ceil(filteredUsers.length / 10)}
        </span>
        {PaginationButton}
        <PaginationButton />
      </div>
    </div>
  );
}

export default App;
