import {Button, HTag} from "../components";
import cn from "classnames";

export default function Home() {
  return (
    <>
      <HTag tag="h1">Заголовок</HTag>
      <Button>Кнопка</Button>
      <Button type="second">Нажать</Button>
    </>
  );
}
