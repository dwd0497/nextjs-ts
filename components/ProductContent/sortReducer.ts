import { IProduct } from "../../interfaces/product.interface";

export const enum SortType {
  Rating,
  Price,
}

type SortActions = {type: SortType.Price} | {type: SortType.Rating}

interface sortState<T> {
  currentType: SortType;
  items: T;
}

export const sortReducer = (state: sortState<IProduct[]>, action: SortActions):sortState<IProduct[]>  => {
  switch (action.type) {
    case SortType.Price:
      return {
        currentType: SortType.Price,
        items: state.items.sort((a, b) => a.price > b.price ? -1 : 1),
      }
    case SortType.Rating:
      return {
        currentType: SortType.Rating,
        items: state.items.sort((a, b) => a.initialRating > b.initialRating ? -1 : 1),
      }
    default:
      throw new Error('Неверный тип сортировки')
  }

}