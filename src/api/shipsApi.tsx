import axios from "axios";
import { AxiosError } from "axios";

import { API_URL, NATIONS_QUERY, SHIPS_QUERY, TYPES_QUERY, DEFAULT_ITEM } from "../constants/constants";
import { IShip, IItem } from "../constants/interface";

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
    const serverData = await axios.post<any>(API_URL, { query: SHIPS_QUERY });
    const dataShips = serverData.data.data.vehicles;
    result.data = dataShips;
  } catch(error) {
    const err = error as AxiosError;
    result.hasError = true;
    result.errorMessage = err.message;
  }

  return result;
}

async function getItems(field: string) {
  const result: Result<IItem[]> = {
    hasError: false,
    errorMessage: "",
    data: null,
  }
  let query = '';

  switch(field) {
    case 'vehicleTypes':
      query = TYPES_QUERY;
      break;

    case 'nations':
      query = NATIONS_QUERY;
      break;
  }

  try {
    const serverData = await axios.post<any>(API_URL, { query });
    let dataItems = serverData.data.data[field];
    dataItems = dataItems.map((type: any) => {
      const {title, name} = type;
      return {
        label: title,
        value: name
      }
    });
    dataItems.unshift(DEFAULT_ITEM);
    result.data = dataItems;
  } catch(error) {
    const err = error as AxiosError;
    result.hasError = true;
    result.errorMessage = err.message;
  }

  return result;
}

export {
  getShips,
  getItems
};