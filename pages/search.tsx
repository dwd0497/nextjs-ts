import { GetStaticProps } from "next";
import { Heading } from "../components";
import { withLayout } from "../layout/Layout";
import axios from "axios";
import { IMenuItem } from "../interfaces/menuItem.interface";

function Search({menu}: ISearchPage) {

  return (
    <Heading tag="h1">
      Search page
    </Heading>
  );
}

export default withLayout(Search);

export const getStaticProps: GetStaticProps<ISearchPage> = async () => {
  const topLevelCategory = 0;
  const { data: menu } = await axios.post<IMenuItem[]>(`${process.env.NEXT_PUBLIC_API_URL}/top-page/find`, {
    firstCategory: topLevelCategory
  });

  return {
    props: {
      menu,
      topLevelCategory
    }
  };
};

interface ISearchPage extends Record<string, unknown> {
  menu: IMenuItem[],
  topLevelCategory: number
}
