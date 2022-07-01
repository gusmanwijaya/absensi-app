import { GET_ALL_KELAS, ERROR_KELAS, SET_PAGE } from "./types";
import { getAll } from "../../services/kelas";
import debounce from "debounce-promise";

const debouncedGetAll = debounce(getAll, 100);

const setPage = (page) => {
  return {
    type: SET_PAGE,
    page,
  };
};

const setGetAllKelas = (allData, total_page) => {
  return {
    type: GET_ALL_KELAS,
    allData,
    total_page,
  };
};

const setErrorKelas = (error) => {
  return {
    type: ERROR_KELAS,
    error,
  };
};

const fetchAllKelas = () => {
  return async (dispatch, getState) => {
    const params = {
      page: getState().kelasReducers?.page || 1,
      limit: getState().kelasReducers?.limit || 10,
    };

    const response = await debouncedGetAll(params?.page, params?.limit);
    if (response?.data?.statusCode === 200) {
      dispatch(
        setGetAllKelas(response?.data?.data, response?.data?.total_page)
      );
    } else {
      dispatch(setErrorKelas(response));
    }
  };
};

export { fetchAllKelas, setPage };
