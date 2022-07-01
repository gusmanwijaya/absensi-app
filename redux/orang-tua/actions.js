import { GET_ALL_ORANG_TUA, ERROR_ORANG_TUA, SET_PAGE } from "./types";
import { getAll } from "../../services/orang-tua";
import debounce from "debounce-promise";

const debouncedGetAll = debounce(getAll, 100);

const setPage = (page) => {
  return {
    type: SET_PAGE,
    page,
  };
};

const setGetAllOrangTua = (allData, total_page) => {
  return {
    type: GET_ALL_ORANG_TUA,
    allData,
    total_page,
  };
};

const setErrorOrangTua = (error) => {
  return {
    type: ERROR_ORANG_TUA,
    error,
  };
};

const fetchAllOrangTua = () => {
  return async (dispatch, getState) => {
    const params = {
      page: getState().orangTuaReducers?.page || 1,
      limit: getState().orangTuaReducers?.limit || 10,
    };

    const response = await debouncedGetAll(params?.page, params?.limit);
    if (response?.data?.statusCode === 200) {
      dispatch(
        setGetAllOrangTua(response?.data?.data, response?.data?.total_page)
      );
    } else {
      dispatch(setErrorOrangTua(response));
    }
  };
};

export { fetchAllOrangTua, setPage };
