const API_URL = 'https://vortex.korabli.su/api/graphql/glossary';

const query = `query vehicles {
  vehicles {
    id
    title
    description
    level
    nationName
    typeName
    icons {
        medium
    }
  }
}`;

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

export { 
  API_URL,
  query
};

export type {
  IShip
}