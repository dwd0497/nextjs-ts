import React, { ReactNode } from 'react';
import styles from './Button.module.scss';
import cn from "classnames";

interface IButton {
  type?: "primary" | "second",
  children: ReactNode;
}

export const Button = ({ type = "primary", children }:IButton) => {
  return <button className={cn(styles.button, {[styles.button_second]: type === 'second'})}>{children}</button>;
};
