import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
  CLEAN_CART,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
} from "../redux/CartActions";

const initialState = {
  // Khởi tạo lại giỏ hàng từ một mảng thành một object
  cart: {},
  favorites: {},
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const userId = action.payload.userId;
      const product = action.payload.product;
      const existingProductIndex = state.cart[userId]?.findIndex(
        (item) => item._id === product._id
      );

      if (existingProductIndex >= 0) {
        // Sản phẩm đã có trong giỏ hàng, tăng số lượng
        const cart = { ...state.cart };
        const existingProduct = { ...cart[userId][existingProductIndex] };
        existingProduct.quantity += 1;
        cart[userId] = [...cart[userId]];
        cart[userId][existingProductIndex] = existingProduct;
        return { ...state, cart };
      } else {
        // Sản phẩm chưa có trong giỏ hàng, thêm mới
        const newProduct = { ...product, quantity: 1 };
        const userCart = state.cart[userId]
          ? [...state.cart[userId], newProduct]
          : [newProduct];
        return {
          ...state,
          cart: { ...state.cart, [userId]: userCart },
        };
      }

    case REMOVE_FROM_CART:
      if (state.cart[action.payload.userId]) {
        const userCartRemove = [...state.cart[action.payload.userId]];
        return {
          ...state,
          cart: {
            ...state.cart,
            [action.payload.userId]: userCartRemove.filter(
              (item) => item._id !== action.payload.product._id
            ),
          },
        };
      } else {
        return state;
      }

    case INCREMENT_QUANTITY:
      if (state.cart[action.payload.userId]) {
        const userCartInc = [...state.cart[action.payload.userId]];
        return {
          ...state,
          cart: {
            ...state.cart,
            [action.payload.userId]: userCartInc.map((item) =>
              item._id === action.payload.product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          },
        };
      } else {
        return state;
      }

    case DECREMENT_QUANTITY:
      if (state.cart[action.payload.userId]) {
        const userCartDec = [...state.cart[action.payload.userId]];
        return {
          ...state,
          cart: {
            ...state.cart,
            [action.payload.userId]: userCartDec
              .map((item) =>
                item._id === action.payload.product._id
                  ? item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : undefined
                  : item
              )
              .filter(Boolean),
          },
        };
      } else {
        return state;
      }

    case CLEAN_CART:
      return {
        ...state,
        cart: {
          ...state.cart,
          [action.payload]: [],
        },
      };

    case ADD_TO_FAVORITES: {
      const { userId, product } = action.payload;
      return {
        ...state,
        favorites: {
          ...state.favorites,
          [userId]: [...(state.favorites[userId] || []), product],
        },
      };
    }

    case REMOVE_FROM_FAVORITES: {
      const { userId, product } = action.payload;
      return {
        ...state,
        favorites: {
          ...state.favorites,
          [userId]: state.favorites[userId].filter(
            (item) => item._id !== product._id
          ),
        },
      };
    }

    default:
      return state;
  }
};

export default cartReducer;
