import axios from "axios";
import { AxiosError } from "axios";

import { API_URL, query, IShip } from "../constants/constants";

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
    const serverData = await axios.post<any>(API_URL, { query });
    const dataShips = serverData.data.data.vehicles;
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