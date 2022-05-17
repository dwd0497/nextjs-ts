import React, { DetailedHTMLProps, HTMLAttributes, KeyboardEvent } from 'react';
import styles from './Sort.module.scss';
import cn from "classnames";
import SortIcon from './SortIcon.svg'
import { SortType } from "../ProductContent/sortReducer";

interface ISort extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
  currentSortType: SortType | null,
  onSortChange: (sortType: SortType.Price | SortType.Rating) => void
}

export const Sort = ({className, currentSortType, onSortChange, ...restProps}: ISort) => {
  return (
    <ul className={cn(styles.sort, className)} {...restProps}>
      <li
        className={cn(styles.sort__item,
          {[styles.sort__item_active]: currentSortType === SortType.Rating}
        )}
        onClick={() => onSortChange(SortType.Rating)}
        onKeyDown={(key:KeyboardEvent<HTMLLIElement>) => {
          if (key.code === 'Space' || key.code === 'Enter') {
            key.preventDefault();
            onSortChange(SortType.Rating);
          }
        }}
        tabIndex={0}
      >
        <SortIcon className={styles.sort__icon}/>
        <span className={styles.sort__name}>По рейтингу</span>
      </li>
      <li
        className={cn(styles.sort__item,
          {[styles.sort__item_active]: currentSortType === SortType.Price}
        )}
        onClick={() => onSortChange(SortType.Price)}
        onKeyDown={(key:KeyboardEvent<HTMLLIElement>) => {
          if (key.code === 'Space' || key.code === 'Enter') {
            key.preventDefault();
            onSortChange(SortType.Price);
          }
        }}
        tabIndex={0}
      >
        <SortIcon className={styles.sort__icon}/>
        <span className={styles.sort__name}>По цене</span>
      </li>
    </ul>
  )
};



