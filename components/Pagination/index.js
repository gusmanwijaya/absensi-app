import React from "react";

const Pagination = ({
  page,
  handlePrevious,
  handleNext,
  disabledPrevious,
  disabledNext,
}) => {
  return (
    <div className="btn-group">
      <button
        className="btn btn-ghost btn-sm disabled:bg-transparent hover:bg-transparent"
        onClick={handlePrevious}
        disabled={disabledPrevious}
      >
        «
      </button>
      <button className="btn btn-ghost btn-sm hover:bg-transparent">
        Page {page}
      </button>
      <button
        className="btn btn-ghost btn-sm disabled:bg-transparent hover:bg-transparent"
        onClick={handleNext}
        disabled={disabledNext}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
