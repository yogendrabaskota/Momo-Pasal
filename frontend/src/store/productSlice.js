import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../http";

const STATUSES = Object.freeze({
  SUCCESS: "success",
  ERROR: "error",
  LOADING: "loading",
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    status: STATUSES.SUCCESS,
    selectedProduct: null,
    selectedProductReviews: [],
  },
  reducers: {
    setProducts(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.SUCCESS;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.status = STATUSES.LOADING;
        state.selectedProduct = null;
        state.selectedProductReviews = [];
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        // Since backend returns product as an array: product: [{...}]
        const productArray = action.payload.product;
        state.selectedProduct =
          productArray.length > 0 ? productArray[0] : null;
        state.selectedProductReviews = action.payload.productReviews || [];
        state.status = STATUSES.SUCCESS;
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        state.status = STATUSES.ERROR;
        state.selectedProduct = null;
        state.selectedProductReviews = [];
      });
  },
});

export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;

// Thunk to fetch all products
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const response = await API.get("/products");
  return response.data.data; // returns array of products
});

// Thunk to fetch single product and reviews
export const fetchProductDetails = createAsyncThunk(
  "products/fetchDetails",
  async (productId) => {
    const response = await API.get(`/products/${productId}`);
    console.log("response herere", response.data.data.product);
    return response.data.data; // { product: [...], productReviews: [...] }
  }
);
