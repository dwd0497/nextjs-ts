import React, { DetailedHTMLProps, FormHTMLAttributes } from 'react';
import styles from './AddReviewForm.module.scss';
import cn from "classnames";
import { Input } from "../Input/Input";
import { Rating } from "../Rating/Rating";
import { Textarea } from "../Textarea/Textarea";
import { Button } from "../Button/Button";
import CloseIcon from  './close.svg'
import { useForm, Controller } from "react-hook-form";

interface IReview extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  productId: string | number,
}

interface IReviewForm {
  name: string,
  title: string,
  rating: number,
  message: string,
}

export const AddReviewForm = ({ productId, className, ...restProps }: IReview) => {

  const { control, register, handleSubmit } = useForm<IReviewForm>();

  const onSubmit = (data: IReviewForm)=> {
    console.log('submit', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn(styles.form, className)} {...restProps}>
      <Input
        placeholder="Имя"
        className={styles.form__name}
        {...register('name')}
      />
      <Input
        placeholder="Заголовок отзыва"
        className={styles.form__title}
        {...register('title')}
      />
      <div className={styles.form__rating}>
        Оценка:
        <Controller
          control={control}
          name="rating"
          render={({ field })=> (
            <Rating rating={field.value} setRating={field.onChange} ref={field.ref} isEditable />
          )}
        />
      </div>
      <Textarea
        placeholder="Текст отзыва"
        className={styles.form__message}
        {...register('message')}
      />
      <div className={styles.form__submit}>
        <Button className={styles.form__button}>Отправить</Button>
        * Перед публикацией отзыв пройдет предварительную модерацию и проверку
      </div>
      <div className={styles.form__feedback}>
        <span>Ваш отзыв отправлен.</span>
        <span>Спасибо, ваш отзыв будет опубликован после проверки.</span>
        <CloseIcon className={styles.form__feedbackClose} />
      </div>
    </form>
  );
};
