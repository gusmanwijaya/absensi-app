import { GET_ALL_JURUSAN, ERROR_JURUSAN, SET_PAGE } from "./types";
import { getAll } from "../../services/jurusan";
import debounce from "debounce-promise";

const debouncedGetAll = debounce(getAll, 100);

const setPage = (page) => {
  return {
    type: SET_PAGE,
    page,
  };
};

const setGetAllJurusan = (allData, total_page) => {
  return {
    type: GET_ALL_JURUSAN,
    allData,
    total_page,
  };
};

const setErrorJurusan = (error) => {
  return {
    type: ERROR_JURUSAN,
    error,
  };
};

const fetchAllJurusan = () => {
  return async (dispatch, getState) => {
    const params = {
      page: getState().jurusanReducers?.page || 1,
      limit: getState().jurusanReducers?.limit || 10,
    };

    const response = await debouncedGetAll(params?.page, params?.limit);
    if (response?.data?.statusCode === 200) {
      dispatch(
        setGetAllJurusan(response?.data?.data, response?.data?.total_page)
      );
    } else {
      dispatch(setErrorJurusan(response));
    }
  };
};

export { fetchAllJurusan, setPage };
