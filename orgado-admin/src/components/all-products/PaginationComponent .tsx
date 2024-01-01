import React from "react";

const PaginationComponent = ({ totalPages, currentPage, setPage }: any) => {
  const paginationItems: any = [];

  // Function to handle preview and next buttons
  const handlePreviewNext = (type: string) => {
    if (type === "preview" && currentPage > 1) {
      setPage(Math.max(currentPage - 3, 1)); // Go back by 3 pages, but stay above 1
    } else if (type === "next" && currentPage + 3 <= totalPages) {
      setPage(currentPage + 3); // Go forward by 3 pages
    }
  };

  // "Preview" button
  paginationItems.push(
    <li key="preview">
      <button onClick={() => handlePreviewNext("preview")}>Prev</button>
    </li>
  );

  // Loop through totalPages and generate pagination elements for the current set of 3 pages
  for (let pageNumber = currentPage; pageNumber < currentPage + 3 && pageNumber <= totalPages; pageNumber++) {
    paginationItems.push(
      <li key={pageNumber}>
        <button
          onClick={() => setPage(pageNumber)}
          className={pageNumber === currentPage ? "active" : ""}
        >
          {pageNumber < 10 ? "0" + pageNumber : pageNumber}
        </button>
      </li>
    );
  }

  // "Next" button
  paginationItems.push(
    <li key="next">
      <button onClick={() => handlePreviewNext("next")}>Next</button>
    </li>
  );

  return (
    <div className="cashier-pagination text-right maxSm:text-center pagination-div">
      <ul>{paginationItems}</ul>
    </div>
  );
};

export default PaginationComponent;
