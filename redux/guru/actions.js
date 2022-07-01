import { GET_ALL_GURU, ERROR_GURU, SET_PAGE } from "./types";
import { getAll } from "../../services/guru";
import debounce from "debounce-promise";

const debouncedGetAll = debounce(getAll, 100);

const setPage = (page) => {
  return {
    type: SET_PAGE,
    page,
  };
};

const setGetAllGuru = (allData, total_page) => {
  return {
    type: GET_ALL_GURU,
    allData,
    total_page,
  };
};

const setErrorGuru = (error) => {
  return {
    type: ERROR_GURU,
    error,
  };
};

const fetchAllGuru = () => {
  return async (dispatch, getState) => {
    const params = {
      page: getState().guruReducers?.page || 1,
      limit: getState().guruReducers?.limit || 10,
    };

    const response = await debouncedGetAll(params?.page, params?.limit);
    if (response?.data?.statusCode === 200) {
      dispatch(setGetAllGuru(response?.data?.data, response?.data?.total_page));
    } else {
      dispatch(setErrorGuru(response));
    }
  };
};

export { fetchAllGuru, setPage };
