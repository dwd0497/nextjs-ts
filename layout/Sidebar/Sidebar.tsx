import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

interface ISidebar extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>{ }

export const Sidebar = (props: ISidebar) => {
  return (
    <aside {...props}>
      Сайдбар
    </aside>
  );
};
