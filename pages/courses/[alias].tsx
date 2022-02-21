import React from 'react';
import { withLayout } from "../../layout/Layout";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import axios from "axios";
import { IMenuItem } from "../../interfaces/menuItem.interface";
import { IInnerPage } from "../../interfaces/innerPage.interface";
import { ParsedUrlQuery } from "querystring";
import { IProduct } from "../../interfaces/product.interface";

const firstCategory = 0;

const Course = ({ menu, page, products }: ICoursePage) => {
  return (
    <div>
      {products && products.length}
    </div>
  );
};

export default withLayout(Course);

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: menu } = await axios.post<IMenuItem[]>(`${process.env.NEXT_PUBLIC_API_URL}/top-page/find`, { firstCategory });

  return {
    paths: menu.flatMap(menuItem => menuItem.pages.map(page => `/courses/${page.alias}`)),
    fallback: true
  };
};

export const getStaticProps: GetStaticProps<ICoursePage> = async ({ params }:GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return  {
      notFound: true,
    };
  }

  const { data: menu } = await axios.post<IMenuItem[]>(`${process.env.NEXT_PUBLIC_API_URL}/top-page/find`, { firstCategory });
  const { data: page } = await axios.get<IInnerPage>(`${process.env.NEXT_PUBLIC_API_URL}/top-page/byAlias/${params.alias}`);
  const { data: products } = await axios.post<IProduct[]>(`${process.env.NEXT_PUBLIC_API_URL}/product/find`, { category: page.category,  limit: 10 });
  return {
    props: {
      firstCategory,
      menu,
      page,
      products,
    }
  };
};

interface ICoursePage extends Record<string, unknown> {
  firstCategory: number,
  menu: IMenuItem[],
  page: IInnerPage,
  products: IProduct[],
}

