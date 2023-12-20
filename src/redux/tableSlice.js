import { createSlice } from "@reduxjs/toolkit";

const sampleRowData = [
  {
    isChecked: false,
    id: 1,
    firstName: "Jon",
    lastName: "Snow",
    age: 14,
    isEdit: false,
  },
  {
    isChecked: false,
    id: 2,
    firstName: "Cersei",
    lastName: "Lannister",
    age: 31,
    isEdit: false,
  },
  {
    isChecked: false,
    id: 3,
    firstName: "Jaime",
    lastName: "Lannister",
    age: 31,
    isEdit: false,
  },
  {
    isChecked: false,
    id: 4,
    firstName: "Arya",
    lastName: "Stark",
    age: 11,
    isEdit: false,
  },

  {
    isChecked: false,
    id: 5,
    firstName: "Daenerys",
    lastName: "Targaryen",
    age: null,
    isEdit: false,
  },
  {
    isChecked: false,
    id: 6,
    firstName: "",
    lastName: "Melisandre",
    age: 150,
    isEdit: false,
  },
  {
    isChecked: false,
    id: 7,
    firstName: "Ferrara",
    lastName: "Clifford",
    age: 44,
    isEdit: false,
  },
  {
    isChecked: false,
    id: 8,
    firstName: "Rossini",
    lastName: "Frances",
    age: 36,
    isEdit: false,
  },
  {
    isChecked: false,
    id: 9,
    firstName: "Harvey",
    lastName: "Roxie",
    age: 65,
    isEdit: false,
  },
  {
    isChecked: false,
    id: 10,
    firstName: "Jon",
    lastName: "Snow",
    age: 14,
    isEdit: false,
  },
  {
    isChecked: false,
    id: 11,
    firstName: "Cersei",
    lastName: "Lannister",
    age: 31,
    isEdit: false,
  },
  {
    isChecked: false,
    id: 12,
    firstName: "Jaime",
    lastName: "Lannister",
    age: 31,
    isEdit: false,
  },
  {
    isChecked: false,
    id: 13,
    firstName: "Arya",
    lastName: "Stark",
    age: 11,
    isEdit: false,
  },

  {
    isChecked: false,
    id: 14,
    firstName: "Daenerys",
    lastName: "Targaryen",
    age: null,
    isEdit: false,
  },
  {
    isChecked: false,
    id: 15,
    firstName: "",
    lastName: "Melisandre",
    age: 150,
    isEdit: false,
  },
  {
    isChecked: false,
    id: 16,
    firstName: "Ferrara",
    lastName: "Clifford",
    age: 44,
    isEdit: false,
  },
  {
    isChecked: false,
    id: 17,
    firstName: "Rossini",
    lastName: "Frances",
    age: 36,
    isEdit: false,
  },
  {
    isChecked: false,
    id: 18,
    firstName: "Harvey",
    lastName: "Roxie",
    age: 65,
    isEdit: false,
  },
];

const headerRow = [
  {
    id: 1,
    name: "checkbox",
  },
  {
    id: 2,
    name: "ID",
    sort: "none",
  },
  {
    id: 3,
    name: "First Name",
    sort: "none",
  },
  {
    id: 4,
    name: "Last Name",
    sort: "none",
  },
  {
    id: 5,
    name: "Age",
    sort: "none",
  },
  {
    id: 6,
    name: "Full Name",
  },
];

let endIndex;
let startIndex;

const initialState = {
  rows: [...sampleRowData],
  dummyRows: [...sampleRowData],
  noOfRows: 5,
  headerRow: headerRow,
  pageNumber: 1,
};

const dataTableSlice = createSlice({
  name: "dataTableList",
  initialState,
  reducers: {
    rowsPerTable(state, action) {
      const dummyRows = state.dummyRows;
      state.noOfRows = action.payload;
      state.pageNumber = 1;
      state.rows = [...dummyRows].slice(0, action.payload);
    },
    addRow(state, action) {
      const { isChecked, firstName, lastName, age } = action.payload;
      const { dummyRows } = state;
      state.dummyRows = [
        ...dummyRows,
        {
          isChecked: isChecked,
          id: dummyRows.length + 1,
          firstName: firstName,
          lastName: lastName,
          age: age ? parseInt(age) : "",
          isEdit: false,
        },
      ];
      state.rows = [
        ...state.rows,
        {
          isChecked: isChecked,
          id: dummyRows.length + 1,
          firstName: firstName,
          lastName: lastName,
          age: age ? parseInt(age) : "",
          isEdit: false,
        },
      ];
    },
    blurInputItem(state, action) {
      state.dummyRows = state.dummyRows.map((obj) => {
        if (obj.id === action.payload) {
          return { ...obj, isEdit: false };
        }
        return obj;
      });
      state.rows = [...state.rows].map((obj) => {
        if (obj.id === action.payload) {
          return { ...obj, isEdit: false };
        }
        return obj;
      });
    },
    sortRow(state, action) {
      const { name, sort } = action.payload;
      state.headerRow = headerRow;
      // console.log(headRow);
      state.pageNumber = 1;
      const sortType =
        name === "ID"
          ? "id"
          : name === "First Name"
          ? "firstName"
          : name === "Last Name"
          ? "lastName"
          : "age";

      let sortList = state.dummyRows.sort((a, b) => {
        if (sort === "none") {
          if (sortType === "firstName" || sortType === "lastName") {
            return a[sortType].localeCompare(b[sortType]);
          }
          return b[sortType] - a[sortType];
        } else if (sort === "asc") {
          if (sortType === "firstName" || sortType === "lastName") {
            return b[sortType].localeCompare(a[sortType]);
          }
          return a[sortType] - b[sortType];
        }
        return null;
      });
      if (sort === "des") {
        let newList = [...state.dummyRows].sort((a, b) => a.id - b.id);
        sortList = newList;
      }
      state.dummyRows = sortList;

      let stateSortList = [...state.rows].sort((a, b) => {
        if (sort === "none") {
          if (sortType === "firstName" || sortType === "lastName") {
            return a[sortType].localeCompare(b[sortType]);
          }
          return b[sortType] - a[sortType];
        } else if (sort === "asc") {
          if (sortType === "firstName" || sortType === "lastName") {
            return b[sortType].localeCompare(a[sortType]);
          }
          return a[sortType] - b[sortType];
        }
        return null;
      });
      if (sort === "des") {
        let newList = [...state.dummyRows].sort((a, b) => a.id - b.id);
        stateSortList = newList;
      }

      state.rows = stateSortList;
    },
    doubleClickRowItem(state, action) {
      state.dummyRows = state.dummyRows.map((obj) => {
        if (obj.id === action.payload) {
          return { ...obj, isEdit: true };
        }
        return obj;
      });
      state.rows = [...state.rows].map((obj) => {
        if (obj.id === action.payload) {
          return { ...obj, isEdit: true };
        }
        return obj;
      });
    },
    editInputItem(state, action) {
      const { e, objKey, id } = action.payload;
      state.dummyRows = [...state.dummyRows].map((obj) => {
        if (obj.id === id) {
          return { ...obj, [objKey]: e.target.value };
        }
        return obj;
      });
      state.rows = [...state.rows].map((obj) => {
        if (obj.id === id) {
          return { ...obj, [objKey]: e.target.value };
        }
        return obj;
      });
    },
    changeCheckedRow(state, action) {
      state.dummyRows = state.dummyRows.map((data) => {
        if (action.payload === data.id) {
          return {
            isChecked: !data.isChecked,
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            age: data.age ? parseInt(data.age) : "",
            isEdit: false,
          };
        }
        return data;
      });

      state.rows = [...state.rows].map((row) => {
        if (row.id === action.payload) {
          return { ...row, isChecked: !row.isChecked };
        }
        return row;
      });
    },
    changeAllChecked(state, action) {
      state.dummyRows = state.dummyRows.map((obj) => ({
        ...obj,
        isChecked: action.payload,
      }));
      state.rows = [...state.rows].map((data) => ({
        isChecked: (data.isChecked = action.payload),
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        age: data.age ? parseInt(data.age) : "",
        isEdit: false,
      }));
    },
    searchRows(state, action) {
      let value = action.payload;
      state.rows = [...state.dummyRows].filter(
        (data) =>
          data.firstName.toLowerCase().includes(value.toLowerCase()) ||
          data.lastName.toLowerCase().includes(value.toLowerCase()) ||
          data.age === parseInt(value) ||
          data.id === parseInt(value)
      );
    },
    paginateRowsIncrement(state, action) {
      let { pageNo, noOfRows } = action.payload;
      state.pageNumber = pageNo;
      endIndex = pageNo * noOfRows;
      startIndex = endIndex - noOfRows;
      console.log(startIndex, endIndex);
      state.rows = [...state.dummyRows].slice(startIndex, endIndex);
    },
    paginateRowsDecrement(state, action) {
      let { pageNo, noOfRows } = action.payload;
      state.pageNumber = pageNo;
      endIndex = pageNo * noOfRows;
      startIndex = endIndex - noOfRows;
      state.rows = [...state.dummyRows].slice(startIndex, endIndex);
    },
  },
});

export const {
  rowsPerTable,
  addRow,
  blurInputItem,
  sortRow,
  doubleClickRowItem,
  editInputItem,
  changeCheckedRow,
  changeAllChecked,
  searchRows,
  paginateRowsIncrement,
  paginateRowsDecrement,
} = dataTableSlice.actions;

export default dataTableSlice.reducer;
