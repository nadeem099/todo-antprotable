import React from "react";
import PropType from "prop-types";
import { Pagination, AddNewToDo } from "../components";

function MasterLayout({ children, showPagination }) {
  return (
    <div className="w-[70%]  border m-auto">
      <div className="py-8 px-16">
        <h1 className="text-lg font-semibold mb-4">TODO</h1>
        <table className="table-fixed overflow-x-auto block">
          <thead className="bg-gray-300 text-left">
            <tr>
              <th className="p-8">Timestamp</th>
              <th className="p-8">Title<sup>*</sup></th>
              <th className="p-8">Description<sup>*</sup></th>
              <th className="p-8">Due Date</th>
              <th className="p-8">Tags
                <small className="text-[10px] block">
                  <i>(hit enter after entering the tag)</i>
                </small>
              </th>
              <th className="p-8">Status<sup>*</sup></th>
              <th className="p-8">Operate</th>
            </tr>
          </thead>
          {children}
        </table>
        <AddNewToDo />
        {showPagination && <Pagination />}
      </div>
    </div>
  );
}

MasterLayout.defaultProps = {
  showPagination: true,
};

MasterLayout.propTypes = {
  children: PropType.element,
  showPagination: PropType.bool,
};

export default MasterLayout;
