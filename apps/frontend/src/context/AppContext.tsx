import { ReactNode, createContext, useState } from 'react';

import { TOKEN_PATH } from '../utils/constants';

export type AppContextState = {
  loggedUser?: any;
  setLoggedUser: (loggedUser: any) => void;
  signOut: () => void;
  signIn: (token: string) => void;
};

const AppContext = createContext<AppContextState>({
  loggedUser: null,
} as AppContextState);

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

type AppContextProviderProps = {
  children: ReactNode;
};

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const token = sessionStorage.getItem(TOKEN_PATH);

  const [loggedUser, setLoggedUser] = useState(parseJwt(token || ''));

  function signOut() {
    sessionStorage.removeItem(TOKEN_PATH);

    setLoggedUser(null);
  }

  function signIn(token: string) {
    sessionStorage.setItem(TOKEN_PATH, token);

    setLoggedUser(parseJwt(token));
  }

  return (
    <AppContext.Provider value={{ loggedUser, setLoggedUser, signOut, signIn }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext };

export default AppContextProvider;
