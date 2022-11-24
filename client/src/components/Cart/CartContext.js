import React from "react";
import React, { createContext, useReducer, useEffect } from "react";
import { useState } from "react";

// exporting the cart context to be used in other components
export const CartContext = createContext({
  item: [],
  getProductQuantity: () => {}, //we are just defineing the function here
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalProduct: () => {},
});

// exporting the provider that is wrapped around the app in index
export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);

  const getProductQuantity = (_id) => {
    const quantity = cartProducts.find(
      (product) => product._id === _id
    )?.quantity;

    if (quantity === undefined) {
      return 0;
    }
    return quantity;
  };

  const addOneToCart = (_id) => {
    //we have to first see inside this
    const quantity = getProductQuantity(_id);

    //if product is not in cart
    if (quantity === 0) {
      setCartProducts([
        ...cartProducts,
        {
          _id: _id,
          quantity: 1,
        },
      ]);
    } else {
      setCartProducts(
        cartProducts.map((product) => {
          //this is going to show the quantity in the cart
          product._id === _id
            ? { ...product, quantity: product.quantity + 1 }
            : product;
        })
      );
    }
  };

  const removeOneFromCart = (_id) => {
    const quantity = getProductQuantity(_id);

    if (quantity === 1) {
      deleteFromCart(_id);
    } else {
      setCartProducts(
        cartProducts.map((product) => {
          product._id === _id
            ? { ...product, quantity: product.quantity - 1 }
            : product;
        })
      );
    }
  };

  const deleteFromCart = (_id) => {
    setCartProducts((cartProducts) => {
      cartProducts.filter((currentProduct) => {
        return currentProduct._id != _id;
      });
    });
  };

  //not sure here TODO
  const getTotalProduct = () => {
    let total = 0;
    cartProducts.map((cartItem) => {
      // const produtData =
    });
  };

  //   // Fetch the item data from the API for getting cart items
  //   useEffect(() => {
  //     fetch("/cart")
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((data) => {
  //         setCartProducts(data.data);
  //       });
  //   }, []);

  const contextValue = {
    item: [],
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalProduct,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
