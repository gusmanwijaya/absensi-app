import { GET_ALL_SISWA, ERROR_SISWA, SET_PAGE } from "./types";
import { getAll } from "../../services/siswa";
import debounce from "debounce-promise";

const debouncedGetAll = debounce(getAll, 100);

const setPage = (page) => {
  return {
    type: SET_PAGE,
    page,
  };
};

const setGetAllSiswa = (allData, total_page) => {
  return {
    type: GET_ALL_SISWA,
    allData,
    total_page,
  };
};

const setErrorSiswa = (error) => {
  return {
    type: ERROR_SISWA,
    error,
  };
};

const fetchAllSiswa = () => {
  return async (dispatch, getState) => {
    const params = {
      page: getState().siswaReducers?.page || 1,
      limit: getState().siswaReducers?.limit || 10,
    };

    const response = await debouncedGetAll(params?.page, params?.limit);
    if (response?.data?.statusCode === 200) {
      dispatch(
        setGetAllSiswa(response?.data?.data, response?.data?.total_page)
      );
    } else {
      dispatch(setErrorSiswa(response));
    }
  };
};

export { fetchAllSiswa, setPage };
