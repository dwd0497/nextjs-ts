import React, { DetailedHTMLProps, ForwardedRef, forwardRef, HTMLAttributes, useEffect, useState } from 'react';
import styles from './Rating.module.scss';
import Star from './star.svg';
import cn from "classnames";
import { FieldErrors } from "react-hook-form";

interface IButton extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
  rating: number,
  setRating?: (rating: number) => void,
  isEditable?: Boolean,
  error?: FieldErrors
}

export const Rating = forwardRef(({ rating, setRating, isEditable = false, className, error, ...restProps }: IButton, ref: ForwardedRef<HTMLUListElement>) => {

  const [rawRating, setRawRating] = useState<number>(rating);

  useEffect(()=> {
    setRawRating(rating);
  },[rating])

  return (
    <div
      className={cn(
        styles.rating__wrapper,
        className,
        {[styles.rating__wrapper_error]: error}
        )}>
      <ul className={styles.rating} {...restProps} ref={ref}>
        {new Array(5).fill(<></>).map((item, i) => {
          return (
            <li
              key={i}
              className={styles.rating__item}
              onMouseEnter={() => isEditable && setRawRating(i + 1)}
              onMouseLeave={() => isEditable && setRawRating(rating)}
            >
              <Star
                className={cn(
                  styles.rating__star,
                  {
                    [styles.rating__star_editable]: isEditable,
                    [styles.rating__star_filled]: rawRating > i
                  }
                )}
                onClick={() => {
                  if (isEditable) {
                    setRating && setRating(i + 1);
                    setRawRating(i + 1);
                  }
                }}
                onKeyDown={(e: React.KeyboardEvent<SVGElement>) => {
                  if (e.code === 'Space' && isEditable) {
                    setRating && setRating(i + 1);
                    setRawRating(i + 1);
                  }
                }}
                tabIndex={isEditable ? 0 : -1 }
              />
            </li>
          );
        })}
      </ul>
      {error && <span className={styles.rating__errorMessage}>{error.message}</span>}
    </div>
  );
});
