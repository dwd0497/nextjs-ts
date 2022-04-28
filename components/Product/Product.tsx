import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './Product.module.scss';
import cn from "classnames";
import { IProduct, IProductCharacteristics } from "../../interfaces/product.interface";
import { Heading } from "../Heading/Heading";
import { Rating } from "../Rating/Rating";
import { Tag } from "../Tag/Tag";
import { Paragraph } from "../Paragraph/Paragraph";
import { Button } from "../Button/Button";
import { declDepOnNumber, priceAdapter } from "../../helpers/helpers";

interface IProductComponent extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: IProduct,
}

export const Product = ({ product, className, ...restProps }: IProductComponent) => {
  return (
    <div className={cn(styles.product, className)} {...restProps}>
      <div className={styles.product__header}>
        <img src={process.env.NEXT_PUBLIC_DOMAIN + product.image} alt={product.title} className={styles.product__logo}/>
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
          {product.reviewCount} {declDepOnNumber(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
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
        <Button appearance="second" arrow="right">Узнать подробнее</Button>
      </div>
    </div>
  );
};
