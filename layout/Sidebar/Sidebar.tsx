import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Menu } from '../Menu/Menu';

interface ISidebar extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>{ }

export const Sidebar = (props: ISidebar) => {
  return (
    <aside {...props}>
      <Menu />
    </aside>
  );
};
