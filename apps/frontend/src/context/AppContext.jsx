import { createContext, useState } from 'react';
import { TOKEN_PATH } from '../utils/constants';

const AppContext = createContext({
  loggedUser: null,
});

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const AppContextProvider = ({ children }) => {
  const token = sessionStorage.getItem(TOKEN_PATH);

  const [loggedUser, setLoggedUser] = useState(parseJwt(token));

  return (
    <AppContext.Provider value={{ loggedUser, setLoggedUser }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext };

export default AppContextProvider;
