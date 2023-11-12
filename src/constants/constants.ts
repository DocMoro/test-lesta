const API_URL = 'https://vortex.korabli.su/api/graphql/glossary';

const SHIPS_QUERY = `query vehicles {
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

const TYPES_QUERY = `query vehicleTypes {
  vehicleTypes {
    name
    title
  }
}`;

const NATIONS_QUERY =`query nations {
  nations {
    name
    title
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

const DEFAULT_ITEM = {
  label: 'All',
  value: ''
};

const OPTIONS_LEVEL = [
  {
    label: 'All',
    value: ''
  },
  {
    label: '1',
    value: '1'
  },
  {
    label: '2',
    value: '2'
  },
  {
    label: '3',
    value: '3'
  },
  {
    label: '4',
    value: '4'
  },
  {
    label: '5',
    value: '5'
  },
  {
    label: '6',
    value: '6'
  },
  {
    label: '7',
    value: '7'
  },
  {
    label: '8',
    value: '8'
  },
  {
    label: '9',
    value: '9'
  },
  {
    label: '10',
    value: '10'
  }
];



export { 
  API_URL,
  NATIONS,
  TYPES,
  OPTIONS_LEVEL,
  SHIPS_QUERY,
  TYPES_QUERY,
  NATIONS_QUERY,
  DEFAULT_ITEM
};