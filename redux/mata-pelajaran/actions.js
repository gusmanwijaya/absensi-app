import {
  GET_ALL_MATA_PELAJARAN,
  ERROR_MATA_PELAJARAN,
  SET_PAGE,
} from "./types";
import { getAll } from "../../services/mata-pelajaran";
import debounce from "debounce-promise";

const debouncedGetAll = debounce(getAll, 100);

const setPage = (page) => {
  return {
    type: SET_PAGE,
    page,
  };
};

const setGetAllMataPelajaran = (allData, total_page) => {
  return {
    type: GET_ALL_MATA_PELAJARAN,
    allData,
    total_page,
  };
};

const setErrorMataPelajaran = (error) => {
  return {
    type: ERROR_MATA_PELAJARAN,
    error,
  };
};

const fetchAllMataPelajaran = () => {
  return async (dispatch, getState) => {
    const params = {
      page: getState().mataPelajaranReducers?.page || 1,
      limit: getState().mataPelajaranReducers?.limit || 10,
    };

    const response = await debouncedGetAll(params?.page, params?.limit);
    if (response?.data?.statusCode === 200) {
      dispatch(
        setGetAllMataPelajaran(response?.data?.data, response?.data?.total_page)
      );
    } else {
      dispatch(setErrorMataPelajaran(response));
    }
  };
};

export { fetchAllMataPelajaran, setPage };
