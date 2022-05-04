import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './AddReviewForm.module.scss';
import cn from "classnames";
import { Input } from "../Input/Input";
import { Rating } from "../Rating/Rating";
import { Textarea } from "../Textarea/Textarea";
import { Button } from "../Button/Button";
import CloseIcon from  './close.svg'

interface IReview extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  productId: string | number,
}

export const AddReviewForm = ({ productId, className, ...restProps }: IReview) => {

  return (
    <div className={cn(styles.form, className)} {...restProps}>
      <Input placeholder="Имя" className={styles.form__name} />
      <Input placeholder="Заголовок отзыва" className={styles.form__title} />
      <div className={styles.form__rating}>
        Оценка:
        <Rating rating={3} />
      </div>
      <Textarea placeholder="Текст отзыва" className={styles.form__message} />
      <div className={styles.form__submit}>
        <Button className={styles.form__button}>Отправить</Button>
        * Перед публикацией отзыв пройдет предварительную модерацию и проверку
      </div>
      <div className={styles.form__feedback}>
        <span>Ваш отзыв отправлен.</span>
        <span>Спасибо, ваш отзыв будет опубликован после проверки.</span>
        <CloseIcon className={styles.form__feedbackClose} />
      </div>
    </div>
  );
};
