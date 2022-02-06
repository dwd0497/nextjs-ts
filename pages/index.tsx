import { Button, Heading, Paragraph } from "../components";

export default function Home() {
  return (
    <>
      <Heading tag="h1">Заголовок</Heading>
      <Button arrow="right">Кнопка</Button>
      <Button appearance="second" arrow="down">Нажать</Button>
      <Paragraph size="s">Параграф s</Paragraph>
      <Paragraph>Параграф m</Paragraph>
      <Paragraph size="l">Параграф l</Paragraph>
    </>
  );
}
