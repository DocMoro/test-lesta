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

interface IShip {
  description: string;
  icons: {
    large: string;
    medium: string;
  };
  level: number;
  nation: {
    color: string;
    icons: {
      large: string;
      medium: string;
      small: string;
    };
    name: string;
    title: string;
  };
  title: string;
  type: {
    icons: {
      default: string;
    };
    name: string;
    title: string;
  };
}

export { 
  API_URL,
  GET_QUERY_SHIPS,
  IShip
};