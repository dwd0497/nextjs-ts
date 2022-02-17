import { GetStaticProps } from "next";
import { Button, Heading, Paragraph, Rating, Tag } from "../components";
import { useState } from "react";
import { withLayout } from "../layout/Layout";
import axios from "axios";
import { IMenuItem } from "../interfaces/menuItem.interface";

function Home({menu}: IHomePage) {
  const [rating, setRaring] = useState<number>(1);

  return (
    <>
      <Heading tag="h1">Заголовок</Heading>
      <Button arrow="right">Кнопка</Button>
      <Button appearance="second" arrow="down">Нажать</Button>
      <Paragraph size="s">Параграф s</Paragraph>
      <Paragraph>Параграф m</Paragraph>
      <Paragraph size="l">Параграф l</Paragraph>
      <Tag tagColor="ghost">ghost</Tag>
      <Tag size="m" tagColor="red">red</Tag>
      <Tag tagColor="gray">gray</Tag>
      <Tag size="m" tagColor="green">green</Tag>
      <Tag tagColor="brand">brand</Tag>
      <div>
        <Rating rating={rating} setRating={setRaring} isEditable />
      </div>
      <ul>
        {menu.map((menuItem)=> (
          <li key={menuItem._id.secondCategory}>{menuItem._id.secondCategory}</li>
        ))}
      </ul>
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<IHomePage> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<IMenuItem[]>(`${process.env.NEXT_PUBLIC_API_URL}/top-page/find`, {
    firstCategory
  });

  return {
    props: {
      menu,
      firstCategory
    }
  };
};

interface IHomePage extends Record<string, unknown> {
  menu: IMenuItem[],
  firstCategory: number
}
