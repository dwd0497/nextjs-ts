import React, { DetailedHTMLProps, HTMLAttributes, KeyboardEventHandler, useState } from 'react';
import styles from './Search.module.scss';
import cn from "classnames";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import MagnifierIcon from "./magnifier.svg"
import { useRouter } from "next/router";

interface ISearch extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  appearance?: "primary" | "second",
  arrow?: 'right' | 'down' | 'none',
}

export const Search = ({ className, ...restProps }: ISearch) => {
  const [value, setValue] = useState<string>('');
  const router = useRouter();

  const goToSearch = () => {
    router.push({pathname: '/search', query: value})
  }

  const handleKeyDown:KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      goToSearch()
    }
  }

  return (
    <div className={cn(styles.search, className)} {...restProps}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={styles.search__input}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={goToSearch} className={styles.search__button}>
        <MagnifierIcon className={styles.search__icon} />
      </Button>
    </div>
  );
};
