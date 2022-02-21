import React, { useContext } from 'react';
import { AppContext } from "../../contexts/appContext";

export const Menu = () => {
  const { menu } = useContext(AppContext);

  return (
    <ul>
      {menu.map((menuItem)=> (
        <li key={menuItem._id.secondCategory}>{menuItem._id.secondCategory}</li>
      ))}
    </ul>
  );
};
