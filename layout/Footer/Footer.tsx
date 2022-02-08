import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

interface IFooter extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>{ }

export const Footer = (props: IFooter) => {
  return (
    <footer {...props}>
      Подвал
    </footer>
  );
};
