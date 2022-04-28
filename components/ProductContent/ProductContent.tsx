import React, { DetailedHTMLProps, HTMLAttributes, useReducer } from 'react';
import { IInnerPage, TopLevelCategory } from "../../interfaces/innerPage.interface";
import styles from './ProductContent.module.scss';
import { IProduct } from "../../interfaces/product.interface";
import cn from "classnames";
import { Heading } from "../Heading/Heading";
import { Tag } from "../Tag/Tag";
import { Vacancy } from "../Vacancy/Vacancy";
import { Advantages } from "../Advantages/Advantages";
import { Tags } from "../Tags/Tags";
import parse from 'html-react-parser';
import { Sort } from "../Sort/Sort";
import { SortType } from "./sortReducer";
import { sortReducer } from "./sortReducer";

interface IProductContent extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  page: IInnerPage,
  products: IProduct[],
  topLevelCategory: TopLevelCategory,
}

export const ProductContent = ({page, products, topLevelCategory, className, ...restProps}: IProductContent) => {
  const [sortState, sortDispatch] = useReducer(sortReducer, {
    items: products.sort((a, b) => a.initialRating > b.initialRating ? -1 : 1),
    currentType: SortType.Rating
  })

  return (
    <div className={cn(styles.product, className)} {...restProps}>
      <div className={styles.product__header}>
        <Heading tag="h1">{page.title}</Heading>
        <Tag size="m" tagColor="gray">{products.length}</Tag>
        <Sort currentSortType={sortState.currentType} onSortChange={(sortType) => sortDispatch({type: sortType})} className={styles.product__sort}  />
      </div>
      {!!products?.length && (
        <ul className={styles.product__list}>
          {products.map((product) => <li key={product._id}>{product.title}</li>)}
        </ul>
      )}
      {topLevelCategory === TopLevelCategory.Courses && page.hh &&(
        <Vacancy title={page.category} hhData={page.hh} className={styles.product__vacancy} />
      )}
      {!!page.advantages?.length && (
        <Advantages className={styles.product__advantages} advantages={page.advantages} />
      )}
      {!!page.seoText && (
        <div className={styles.product__seo}>
          {parse(page.seoText)}
        </div>
      )}
      {!!page.tags?.length && (
        <Tags tags={page.tags} />
      )}
    </div>
  )
};