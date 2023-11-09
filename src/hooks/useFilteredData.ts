import { ISearchDt, IShip } from "../constants/interface";

export default function useFilteredData<D>(select: string, searchData: ISearchDt, setData: (param: D) => void) {
  let data = JSON.parse(sessionStorage.getItem(select) || '');
  console.log('hhhh')

  for(let key in searchData) {
    if (searchData[key as keyof typeof searchData] === '') {
      continue
    }
    if (key === 'title') {
      const lowTitle = searchData[key as keyof typeof searchData].toLowerCase();

      data = data.filter((el: IShip) => el.title.toLowerCase().includes(lowTitle))
      continue
    }
    data = data.filter((el: IShip) => {
      return searchData[key as keyof typeof searchData] == el[key as keyof typeof el]
    })
  }

  setData(data)
}