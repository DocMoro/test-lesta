interface IPopup {
  active: boolean;
  image: string;
  description: string;
}

interface IIcons {
  medium: string
}

interface IShip {
  id: string;
  title: string;
  description: string;
  level: number;
  nationName: string;
  typeName: string;
  icons: IIcons;
}

interface ISearchDt {
  title: string;
  typeName: string;
  nationName: string;
  level: string;
}

export type {
  IShip,
  IPopup,
  ISearchDt
}