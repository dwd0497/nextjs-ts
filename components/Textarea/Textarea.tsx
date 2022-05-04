import React, { DetailedHTMLProps, forwardRef, ForwardedRef } from 'react';
import cn from "classnames";
import styles from "./Textarea.module.scss";

interface ITextarea extends DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
}

export const Textarea = forwardRef(({className, children, ...restProps}: ITextarea, ref: ForwardedRef<HTMLTextAreaElement>) => {
  return (
    <textarea
      className={cn(styles.textarea, className)}
      ref={ref}
      {...restProps}
    />
  );
});
