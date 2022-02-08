import { Button, Heading, Paragraph, Rating, Tag } from "../components";
import { useState } from "react";
import { withLayout } from "../layout/Layout";

function Home() {
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
    </>
  );
}

export default withLayout(Home);