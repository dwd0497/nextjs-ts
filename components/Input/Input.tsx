import React, { DetailedHTMLProps } from 'react';
import cn from "classnames";
import styles from "./Input.module.scss";

interface IInput extends DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
}

export const Input = ({className, children, ...restProps}: IInput) => {
  return (
    <input
      className={cn(styles.input, className)}
      {...restProps}
    />
  );
};
