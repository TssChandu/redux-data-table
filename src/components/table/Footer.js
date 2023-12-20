import React, { useState } from "react";
import {
  rowsPerTable,
  paginateRowsIncrement,
  paginateRowsDecrement,
} from "../../redux/tableSlice";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

const Footer = () => {
  let { noOfRows, dummyRows, pageNumber } = useSelector(
    (store) => store.TabledataObject
  );

  let dispatch = useDispatch();

  let pageNo = pageNumber;
  const [tableRows, setTableRows] = useState(5);
  const handleBackward = () => {
    if (pageNumber > 1) {
      pageNo--;
      dispatch(paginateRowsDecrement({ pageNo, noOfRows }));
    }
  };
  const handleForward = () => {
    if (dummyRows.length > pageNumber * noOfRows) {
      pageNo++;
      dispatch(paginateRowsIncrement({ pageNo, noOfRows }));
    }
  };
  const handleRows = (e) => {
    setTableRows(e.target.value);
    dispatch(rowsPerTable(e.target.value));
  };
  return (
    <div className="mt-3 flex flex-row justify-end items-center">
      <select
        className="w-[max-content]"
        onChange={handleRows}
        value={tableRows}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
      </select>
      <div className="ml-4 flex flex-row items-center">
        <FaChevronLeft onClick={handleBackward} />
        <FaChevronRight onClick={handleForward} />
      </div>
    </div>
  );
};

export default Footer;
