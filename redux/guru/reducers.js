// import {
//   GET_ALL_HAMA_PENYAKIT,
//   ERROR_HAMA_PENYAKIT,
//   SET_KEYWORD,
//   SET_PAGE,
// } from "./types";

// const initialState = {
//   keyword: "",
//   page: 1,
//   limit: 10,
//   total_page: 1,
//   allData: [],
//   error: {},
// };

// const reducers = (state = initialState, action) => {
//   switch (action.type) {
//     case GET_ALL_HAMA_PENYAKIT:
//       return {
//         ...state,
//         allData: action.allData,
//         total_page: action.total_page,
//       };

//     case ERROR_HAMA_PENYAKIT:
//       return {
//         ...state,
//         error: action.error,
//       };

//     case SET_KEYWORD:
//       return {
//         ...state,
//         keyword: action.keyword,
//       };

//     case SET_PAGE:
//       return {
//         ...state,
//         page: action.page,
//       };

//     default:
//       return state;
//   }
// };

// export default reducers;
