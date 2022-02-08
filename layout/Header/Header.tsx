import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

interface IHeader extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>{ }

export const Header = (props: IHeader) => {
  return (
    <header {...props}>
      Хедер
    </header>
  );
};
