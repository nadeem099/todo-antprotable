import React, { useContext, useMemo } from "react";
import TodoContext from "../contexts/TodoContext";
import { PAGE_SIZE } from "../helpers";

function Pagination() {
  const { todos, currentPage, setCurrentPage } = useContext(TodoContext);
  const pages = useMemo(() => {
    const totalPages = Math.ceil(todos.length / PAGE_SIZE);
    const arr = [];
    for (let i = 0; i < totalPages; i++) {
      arr.push(i);
    }
    return arr;
  }, [todos]);

  return (
    <div className="flex justify-center">
      {/* <nav aria-label="Page navigation example"> */}
      <ul className="flex w-full ">
        <li>
          <button
            onClick={() =>
              setCurrentPage((prev) => (prev <= 0 ? prev : prev - 1))
            }
            className="px-3 py-2 ml-0 text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
          >
            Previous
          </button>
        </li>
        {pages &&
          pages.map((page) => {
            const active =
              currentPage === page
                ? "text-blue-700 underline"
                : "text-gray-500";
            return (
              <li key={page}>
                <button
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2  bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${active}`}
                >
                  {page + 1}
                </button>
              </li>
            );
          })}
        <li>
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                prev >= pages.length - 1 ? prev : prev + 1
              )
            }
            className="px-3 py-2 text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
          >
            Next
          </button>
        </li>
      </ul>
      {/* </nav> */}
    </div>
  );
}

export default Pagination;
