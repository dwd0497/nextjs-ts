import React, { createContext, PropsWithChildren, useState } from 'react';
import { IMenuItem } from "../interfaces/menuItem.interface";
import { InnerPageCategory } from "../interfaces/innerPage.interface";

export interface IAppContext {
  menu: IMenuItem[];
  setMenu?: (newMenu: IMenuItem[]) => void;
  firstCategory: InnerPageCategory
}

export const AppContext = createContext<IAppContext>({ menu : [], firstCategory: InnerPageCategory.Courses });

const AppContextProvider = ({menu, firstCategory, children}: PropsWithChildren<IAppContext>) => {
  const [menuState, setMenuState] = useState<IMenuItem[]>(menu);

  return (
    <AppContext.Provider value={{menu: menuState, setMenu: setMenuState, firstCategory}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;