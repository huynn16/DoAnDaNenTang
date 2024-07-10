import AsyncStorage from '@react-native-async-storage/async-storage';

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const INCREMENT_QUANTITY = "INCREMENT_QUANTITY";
export const DECREMENT_QUANTITY = "DECREMENT_QUANTITY";
export const CLEAN_CART = "CLEAN_CART";
export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
export const REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES";

export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});

export const removeFromCart = (item) => ({
  type: REMOVE_FROM_CART,
  payload: item,
});

export const incrementQuantity = (item) => ({
  type: INCREMENT_QUANTITY,
  payload: item,
});

export const decrementQuantity = (item) => ({
  type: DECREMENT_QUANTITY,
  payload: item,
});

export const cleanCart = (item) => ({
  type: CLEAN_CART,
  payload: item,
});

export const addToFavorites = (item) => {
  return async (dispatch, getState) => {
    dispatch({
      type: ADD_TO_FAVORITES,
      payload: item,
    });

    const { favorites } = getState().cart;
    await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  };
};

export const removeFromFavorites = (item) => {
  return async (dispatch, getState) => {
    dispatch({
      type: REMOVE_FROM_FAVORITES,
      payload: item,
    });

    const { favorites } = getState().cart;
    await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  };
};
