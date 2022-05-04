import React, { DetailedHTMLProps, ForwardedRef, forwardRef } from 'react';
import cn from "classnames";
import styles from "./Input.module.scss";

interface IInput extends DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
}

export const Input = forwardRef(({className, children, ...restProps}: IInput, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <input
      className={cn(styles.input, className)}
      {...restProps}
      ref={ref}

    />
  );
});
