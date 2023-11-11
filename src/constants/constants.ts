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
        small
        medium
        large
    }
  }
}`;

const NATIONS = {
  japan: 'Japan',
  usa: 'U.S.A.',
  ussr: 'U.S.S.R.',
  germany: 'Germany',
  uk: 'U.K.',
  france: 'France',
  pan_asia: 'Pan-Asia',
  italy: 'Italy',
  commonwealth: 'Commonwealth',
  pan_america: 'Pan-America',
  europe: 'Europe',
  netherlands: 'Netherlands',
  spain: 'Spain'
};

const TYPES = {
  submarine: 'Submarine',
  destroyer: 'Destroyer',
  cruiser: 'Cruiser',
  battleship: 'Battleship',
  aircarrier: 'Aircraft Carrier'
};

export { 
  API_URL,
  NATIONS,
  TYPES,
  query
};