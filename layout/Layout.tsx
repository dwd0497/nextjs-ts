import React, { FunctionComponent } from 'react';
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import { Footer } from "./Footer/Footer";

const Layout = ({children}: {children: JSX.Element}) => {
  return (
    <>
      <Header />
      <div>
        <Sidebar />
        <main>{children}</main>
      </div>
      <Footer />
    </>
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

