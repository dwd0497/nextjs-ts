import React, { DetailedHTMLProps, ForwardedRef, forwardRef, HTMLAttributes, useRef, useState } from 'react';
import styles from './Product.module.scss';
import cn from "classnames";
import { IProduct } from "../../interfaces/product.interface";
import { Heading } from "../Heading/Heading";
import { Rating } from "../Rating/Rating";
import { Tag } from "../Tag/Tag";
import { Paragraph } from "../Paragraph/Paragraph";
import { Button } from "../Button/Button";
import { declDepOnNumber, priceAdapter } from "../../helpers/helpers";
import Image from 'next/image'
import { Review } from "../Review/Review";
import { AddReviewForm } from "../AddReviewForm/AddReviewForm";
import { motion } from "framer-motion";

interface IProductComponent extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: IProduct,
}

export const Product = motion(forwardRef(({ product, className, ...restProps }: IProductComponent, ref:ForwardedRef<HTMLDivElement>) => {
  const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);

  const reviewRef = useRef<HTMLDivElement>(null)

  const scrollToReview = async () => {
    await setIsReviewOpened(true);
    reviewRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  return (
    <div ref={ref} className={styles.product__wrapper}>
      <div className={cn(styles.product, className)} {...restProps}>
        <div className={styles.product__header}>
          <div className={styles.product__logo}>
            <Image
              src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
              alt={product.title}
              width={70}
              height={70}
              objectFit="contain"
              objectPosition="top"
            />
          </div>
          <Heading tag="h3" className={styles.product__title}>{product.title}</Heading>
          <div className={styles.product__price}>
            {priceAdapter(product.price)}
            <Tag tagColor="green" className={styles.product__oldPrice}>- {priceAdapter(product.oldPrice - product.price)}</Tag>
          </div>
          <p className={styles.product__credit}>{priceAdapter(product.credit)}<span>/мес</span></p>
          <Rating rating={product.reviewAvg} className={styles.product__rating} />
          {!!product.tags?.length && (
            <ul className={styles.product__tags}>
              {product.tags.map((tag) => <li key={tag} className={styles.product__tag}><Tag tagColor="ghost">{tag}</Tag></li>)}
            </ul>
          )}
          <p className={styles.product__priceTitle}>цена</p>
          <p className={styles.product__creditTitle}>в кредит</p>
          <p className={styles.product__reviewCount}>
            <a href="#toReview" onClick={scrollToReview}>
              {product.reviewCount} {declDepOnNumber(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
            </a>
          </p>
        </div>
        <Paragraph className={styles.product__description}>{product.description}</Paragraph>
        <div className={styles.product__body}>
          {!!product.characteristics?.length && (
            <ul className={styles.product__characteristics}>
              {product.characteristics.map((characteristic) => (
                <li className={styles.product__characteristic} key={characteristic.name}>
                  <span className={styles.product__characteristicName}>{characteristic.name}</span>
                  <span className={styles.product__characteristicDots} />
                  <span className={styles.product__characteristicValue}>{characteristic.value}</span>
                </li>
              ))}
            </ul>
          )}
          {product.advantages && (
            <div className={styles.product__advantages}>
              <span>Преимущества</span>
              {product.advantages}
            </div>
          )}
          {product.disadvantages && (
            <div className={styles.product__disadvantages}>
              <span>Недостатки</span>
              {product.disadvantages}
            </div>
          )}
        </div>
        <div className={styles.product__buttons}>
          <Button>Узнать подробнее</Button>
          <Button appearance="second" arrow={isReviewOpened ? "down" : "right"} onClick={() => setIsReviewOpened(!isReviewOpened)}>Читать отзывы</Button>
        </div>
      </div>
      {isReviewOpened && (
        <div className={styles.product__reviewBlock} ref={reviewRef}>
          {!!product.reviews?.length && (
            product.reviews.map((review) => <Review  key={review._id} review={review} />)
          )}
          {product.reviews?.length === 0 && (
            <div className={styles.product__emptyReviews}>
              <Paragraph>Будьте первым. Оставьте свой отзыв о продукте.</Paragraph>
            </div>
          )}
          <AddReviewForm productId={product._id} />
        </div>
      )}
    </div>
  );
}));
