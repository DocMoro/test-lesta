interface IPopup {
  active: boolean;
  image: IIcons;
  description: string;
}

interface IIcons {
  medium: string;
  large: string;
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
  IIcons,
  ISearchDt
}