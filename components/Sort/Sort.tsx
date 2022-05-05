import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
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
      >
        <SortIcon className={styles.sort__icon}/>
        <span className={styles.sort__name}>По рейтингу</span>
      </li>
      <li
        className={cn(styles.sort__item,
          {[styles.sort__item_active]: currentSortType === SortType.Price}
        )}
        onClick={() => onSortChange(SortType.Price)}
      >
        <SortIcon className={styles.sort__icon}/>
        <span className={styles.sort__name}>По цене</span>
      </li>
    </ul>
  )
};



