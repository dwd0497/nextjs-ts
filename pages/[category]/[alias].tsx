import React from 'react';
import { withLayout } from "../../layout/Layout";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import axios from "axios";
import { IMenuItem } from "../../interfaces/menuItem.interface";
import { IInnerPage, TopLevelCategory } from "../../interfaces/innerPage.interface";
import { ParsedUrlQuery } from "querystring";
import { IProduct } from "../../interfaces/product.interface";
import { topLevelMenuItems } from "../../helpers/helpers";
import { ProductContent } from "../../components";

const ProductPage = ({page, products, topLevelCategory}: IProductPage) => {
  return <ProductContent page={page} products={products} topLevelCategory={topLevelCategory} />
};

export default withLayout(ProductPage);

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = []
  for (let topLevelMenuItem of topLevelMenuItems) {
    const {data: menu} = await axios.post<IMenuItem[]>(`${process.env.NEXT_PUBLIC_API_URL}/top-page/find`, {firstCategory: topLevelMenuItem.id});
    paths = paths.concat(menu.flatMap(menuItem => menuItem.pages.map(page => `${topLevelMenuItem.route}/${page.alias}`)))
  }

  return {
    paths,
    fallback: true
  };
};

export const getStaticProps: GetStaticProps<IProductPage> = async ({params}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const topLevelMenuItem = topLevelMenuItems.find((topLevelMenuItem) => topLevelMenuItem.route === `/${params.category}`)

  if (!topLevelMenuItem) {
    return {
      notFound: true,
    };
  }

  try {
    const {data: menu} = await axios.post<IMenuItem[]>(`${process.env.NEXT_PUBLIC_API_URL}/top-page/find`, {firstCategory: topLevelMenuItem.id});
    if (menu.length === 0) {
      return {
        notFound: true,
      };
    }
    const {data: page} = await axios.get<IInnerPage>(`${process.env.NEXT_PUBLIC_API_URL}/top-page/byAlias/${params.alias}`);
    const {data: products} = await axios.post<IProduct[]>(`${process.env.NEXT_PUBLIC_API_URL}/product/find`, {
      category: page.category,
      limit: 10
    });
    return {
      props: {
        topLevelCategory: topLevelMenuItem.id,
        menu,
        page,
        products,
      }
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

interface IProductPage extends Record<string, unknown> {
  topLevelCategory: TopLevelCategory,
  menu: IMenuItem[],
  page: IInnerPage,
  products: IProduct[],
}

