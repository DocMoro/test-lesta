import axios from "axios";
import { AxiosError } from "axios";

import { API_URL, GET_QUERY_SHIPS, IShip } from "../constants/constants";

interface Result<T> {
  hasError: boolean;
  errorMessage: string;
  data: T | null
}

async function getShips() {
  const result: Result<IShip[]> = {
    hasError: false,
    errorMessage: "",
    data: null,
  }

  try {
    const serverData = await axios.post<any>(API_URL, { GET_QUERY_SHIPS });
    const dataShips = serverData.data.vehicles;
    result.data = dataShips;
  } catch(error) {
    const err = error as AxiosError;
    result.hasError = true;
    result.errorMessage = err.message;
  }

  return result;
}

export {
  getShips,
};