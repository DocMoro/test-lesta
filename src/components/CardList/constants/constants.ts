const API_URL = 'https://vortex.korabli.su/api/graphql/glossary';

const GET_QUERY_SHIPS = `
query vehicles {
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
  GET_QUERY_SHIPS,
  IShip
};