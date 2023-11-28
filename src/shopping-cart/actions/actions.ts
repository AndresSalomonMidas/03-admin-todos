// 'use client'
/*
  cookie: cart
  {
    'uui-123-1': 4;
    'uui-123-2': 1;
    'uui-123-3': 2;
  }
*/

import { hasCookie, getCookie, setCookie } from 'cookies-next';

export const getCookieCart = (): {[key: string]: number} => {
  if (hasCookie('cart')) {
    const cookieCart = JSON.parse(getCookie('cart') as string ?? '{}');

    return cookieCart;
  }

  return {};
};

export const addProductToCart = (productId: string) => {
  const cookieCart = getCookieCart();

  if (cookieCart[productId]) {
    cookieCart[productId] += 1;
  } else {
    cookieCart[productId] = 1;
  }

  setCookie('cart', JSON.stringify(cookieCart));
};

export const removeProductFromCart = (productId: string) => {
  const cookieCart = getCookieCart();

  if (cookieCart[productId]) {
    if (cookieCart[productId] > 1) {
      cookieCart[productId] -= 1;
    } else {
      delete cookieCart[productId];
    }
  }
};
