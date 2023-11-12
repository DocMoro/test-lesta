import { ISearchDt, IShip } from '../constants/interface';

export default function useFilteredData<D>(
  select: string,
  searchData: ISearchDt,
  setData: (param: D) => void
) {
  let data = JSON.parse(sessionStorage.getItem(select) || '');

  for (const key in searchData) {
    const valueSearch = searchData[key as keyof typeof searchData];

    if (valueSearch === '') {
      continue;
    }
    if (key === 'title') {
      const lowTitle = valueSearch.toLowerCase();

      data = data.filter((el: IShip) =>
        el.title.toLowerCase().includes(lowTitle)
      );
      continue;
    }
    data = data.filter((el: IShip) => {
      // eslint-disable-next-line eqeqeq
      return valueSearch == el[key as keyof typeof el];
    });
  }

  setData(data);
}
