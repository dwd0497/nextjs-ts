import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Menu } from '../Menu/Menu';
import Logo from '/public/images/logo.svg'
import cn from "classnames";
import styles from "./sidebar.module.scss";

interface ISidebar extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>{ }

export const Sidebar = ({className, ...props}: ISidebar) => {
  return (
    <aside className={cn(className, styles.sidebar)} {...props}>
      <Logo />
      <div>Поиск</div>
      <Menu />
    </aside>
  );
};
