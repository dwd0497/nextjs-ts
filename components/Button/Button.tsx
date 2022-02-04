import React, { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import styles from './Button.module.scss';
import cn from "classnames";
import ArrowIcon from "./arrow.svg";

interface IButton extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  appearance?: "primary" | "second",
  children: ReactNode,
  arrow?: 'right' | 'down' | 'none',
}

export const Button = ({ appearance = 'primary', arrow = 'none', children, className, ...restProps }: IButton) => {
  return (
    <button
      className={cn(
        styles.button,
        {[styles.button_second]: appearance === 'second'},
        className,
        )}
      {...restProps}
    >
      {children}
      <ArrowIcon className={cn(styles.arrow, {[styles.arrow_down]: arrow === 'down'})} />
    </button>
  );
};
