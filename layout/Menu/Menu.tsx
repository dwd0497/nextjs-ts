import React, { useContext } from 'react';
import { AppContext } from "../../contexts/appContext";
import { IPageItem, ITopLevelMenuItem } from "../../interfaces/menuItem.interface";
import { TopLevelCategory } from "../../interfaces/innerPage.interface";
import CoursesIcon from './icons/courses.svg';
import ServicesIcon from './icons/services.svg';
import BooksIcon from './icons/books.svg';
import ProductsIcon from './icons/products.svg';
import styles from "./menu.module.scss";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

const topLevelMenuItems: ITopLevelMenuItem[] = [
  {route: '/courses', icon: <CoursesIcon/>, id: TopLevelCategory.Courses, name: 'Курсы'},
  {route: '/services', icon: <ServicesIcon/>, id: TopLevelCategory.Services, name: 'Сервисы'},
  {route: '/books', icon: <BooksIcon/>, id: TopLevelCategory.Books, name: 'Книги'},
  {route: '/products', icon: <ProductsIcon/>, id: TopLevelCategory.Products, name: 'Товары'},
];

export const Menu = () => {
  const {menu, setMenu, firstCategory} = useContext(AppContext);
  const router  = useRouter();

  const toggleMiddleLevelMenu = (secondCategory: string) => {
    setMenu && setMenu(menu.map((menuItem) => {
      if (menuItem._id.secondCategory === secondCategory) {
        menuItem.isOpened = !menuItem.isOpened;
      }
      return menuItem;
    }));
  };

  const buildTopLevelMenu = () => (
    <nav className={styles.menu}>
      <ul className={styles.menu__top}>
        {topLevelMenuItems.map((topLevelItem) => (
          <li className={styles.menu__topItem} key={topLevelItem.id}>
            <Link href={topLevelItem.route}>
              <a
                className={cn(
                  styles.menu__topLink,
                  {[styles.menu__topLink_active]: firstCategory === topLevelItem.id}
                )}
                key={topLevelItem.id}
              >
                {topLevelItem.icon}
                <span className={styles.menu__topName}>{topLevelItem.name}</span>
              </a>
            </Link>
            {firstCategory === topLevelItem.id && buildMiddleLevelMenu(topLevelItem.route)}
          </li>
        ))}
      </ul>
    </nav>
  );

  const buildMiddleLevelMenu = (topLevelRoute: string) => (
    <ul className={styles.menu__middle}>
      {menu.map((middleLevelItem) => {
        if (!!middleLevelItem.pages.find(p => p.alias === router.asPath.split('/')[2])) {
          middleLevelItem.isOpened = true;
        }
        return (
          <li className={styles.menu__middleItem} key={middleLevelItem._id.secondCategory}>
          <span className={styles.menu__middleName} onClick={() => toggleMiddleLevelMenu(middleLevelItem._id.secondCategory)}>{middleLevelItem._id.secondCategory}</span>
            {middleLevelItem.isOpened && buildLoverLevelMenu(middleLevelItem.pages, topLevelRoute)}
          </li>
        );
      })}
    </ul>
  );

  const buildLoverLevelMenu = (pages: IPageItem[], topLevelRoute: string) => (
    pages.map((page) => (
      <Link key={page.title} href={`${topLevelRoute}/${page.alias}`}>
        <a className={cn(
          styles.menu__loverLink,
          {[styles.menu__loverLink_active]: page.alias === router.asPath.split('/')[2]}
          )}
        >
          {page.title}
        </a>
      </Link>
    ))
  );

  return (
    buildTopLevelMenu()
  );
};
