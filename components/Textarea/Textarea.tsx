import React, { DetailedHTMLProps } from 'react';
import cn from "classnames";
import styles from "./Textarea.module.scss";

interface ITextarea extends DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
}

export const Textarea = ({className, children, ...restProps}: ITextarea) => {
  return (
    <textarea
      className={cn(styles.textarea, className)}
      {...restProps}
    />
  );
};
