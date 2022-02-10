import React, { FunctionComponent } from 'react';
import styles from "./layout.module.scss";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import { Footer } from "./Footer/Footer";

const Layout = ({children}: {children: JSX.Element}) => {
  return (
    <div className={styles.app}>
      <Header className={styles.app__header} />
      <Sidebar className={styles.app__sidebar} />
      <main className={styles.app__main}>{children}</main>
      <Footer className={styles.app__footer} />
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown>>(Component:FunctionComponent<T>) => {
  return function withLayoutComponent (props:T): JSX.Element {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
      );
  };
};
