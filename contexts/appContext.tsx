import React, { createContext, PropsWithChildren, useState } from 'react';
import { IMenuItem } from "../interfaces/menuItem.interface";
import { TopLevelCategory } from "../interfaces/innerPage.interface";

export interface IAppContext {
  menu: IMenuItem[];
  setMenu?: (newMenu: IMenuItem[]) => void;
  topLevelCategory: TopLevelCategory
}

export const AppContext = createContext<IAppContext>({ menu : [], topLevelCategory: TopLevelCategory.Courses });

const AppContextProvider = ({menu, topLevelCategory, children}: PropsWithChildren<IAppContext>) => {
  const [menuState, setMenuState] = useState<IMenuItem[]>(menu);

  return (
    <AppContext.Provider value={{menu: menuState, setMenu: setMenuState, topLevelCategory}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;