import Flags from 'country-flag-icons/react/3x2'; 

interface AuthorType {
  site:        string;
  role:        string;
  name:        string;
  avatar:      string;
  country:     string;
  city:        string;
  description: string;
  countryCode: keyof typeof Flags;
}

const Author: AuthorType = {
  site:         '<eshanized />',
  name:         'Eshan Roy',
  role:         'Passionate Programmer.',
  avatar:       'https://avatars.githubusercontent.com/u/148610067?v=4',
  city:         'Somewhere',
  country:      'INDIA',
  countryCode:  'IN', // https://www.npmjs.com/package/country-flag-icons
  description:  'Python Programming',
};

export default Author;