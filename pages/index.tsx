import { Button, Heading } from "../components";

export default function Home() {
  return (
    <>
      <Heading tag="h1">Заголовок</Heading>
      <Button arrow="right">Кнопка</Button>
      <Button appearance="second" arrow="down">Нажать</Button>
    </>
  );
}
