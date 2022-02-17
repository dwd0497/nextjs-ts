export interface IMenuItem {
  _id: {
    secondCategory: string,
  }
  pages: IPageItem[]
}

export interface IPageItem {
  alias: string,
  title: string,
  _id: string,
  category: string,
}