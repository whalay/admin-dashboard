const PaginationButton = ({ pageNumber, handlePageChange, isActive }) => (
  <button
    className={`btn btn-primary ${isActive ? "active" : ""}`}
    onClick={() => handlePageChange("number", pageNumber)}
  >
    {pageNumber}
  </button>
);

export default PaginationButton