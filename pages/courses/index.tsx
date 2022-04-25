import React from 'react';
import { withLayout } from "../../layout/Layout";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import axios from "axios";
import { IMenuItem } from "../../interfaces/menuItem.interface";
import { ParsedUrlQuery } from "querystring";

const topLevelCategory = 0;

const Courses = ({ menu }: ICoursesPage) => {
  return (
    <div>
      Курсы
    </div>
  );
};

export default withLayout(Courses);

export const getStaticProps: GetStaticProps<ICoursesPage> = async () => {
  const { data: menu } = await axios.post<IMenuItem[]>(`${process.env.NEXT_PUBLIC_API_URL}/top-page/find`, { firstCategory: topLevelCategory });
  return {
    props: {
      topLevelCategory,
      menu,
    }
  };
};

interface ICoursesPage extends Record<string, unknown> {
  topLevelCategory: number,
  menu: IMenuItem[],
}

