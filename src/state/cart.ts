import { create } from "zustand";
import _ from "lodash";

const useCartStore = create((set) => ({
  cart: [],
  addToCart: (item: any) =>
    set((state: any) => {
      let template = {
        id: item.productId,
        size: item.size,
      };
      let isInCart = false;
      let itemIndex = null;
      state.cart!.map((item: any, index: number) => {
        let obj = { id: item.productId, size: item.size };
        let isEq = _.isEqual(obj, template);
        if (isEq) {
          isInCart = true;
          itemIndex = index;
        }
      });

      if (isInCart) {
        let newArr = state.cart;
        newArr[itemIndex!].amount = newArr[itemIndex!].amount + item.amount;
        return { cart: newArr };
      } else {
        return { cart: [...state.cart, item] };
      }
    }),
  deleteFromCart: (object: any) =>
    set((state: any) => ({
      cart: state.cart.filter((item: any) => !_.isEqual(object, item)),
    })),
  increase: (productId: number, size: string) =>
    set((state: any) => ({
      cart: state.cart.map((item: any) => {
        if (item.productId === productId && item.size === size) {
          item.amount = item.amount + 1;
          return item;
        } else {
          return item;
        }
      }),
    })),
  decrease: (productId: number, size: string) =>
    set((state: any) => ({
      cart: state.cart.map((item: any) => {
        if (item.productId === productId && item.size === size) {
          if (item.amount !== 1) {
            item.amount = item.amount - 1;
          }
          return item;
        } else {
          return item;
        }
      }),
    })),
  setAmountTo: (productId: number, amount: number, size: string) =>
    set((state: any) => ({
      cart: state.cart.map((item: any) => {
        if (item.productId === productId && item.size === size) {
          item.amount = amount;
          return item;
        } else {
          return item;
        }
      }),
    })),
}));

export default useCartStore;
