import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export interface Product {
  productId: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface NewProduct {
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  
  user: {
    id: string;
    name: string;
    email: string;
  };
}


export interface SalesSummary {
  salesSummaryId: string;
  totalValue: number;
  changePercentage?: number;
  date: string;
}

export interface PurchaseSummary {
  purchaseSummaryId: string;
  totalPurchased: number;
  changePercentage?: number;
  date: string;
}

export interface ExpenseSummary {
  expenseSummarId: string;
  totalExpenses: number;
  date: string;
}

export interface ExpenseByCategorySummary {
  expenseByCategorySummaryId: string;
  category: string;
  amount: string;
  date: string;
}

export interface DashboardMetrics {
  popularProducts: Product[];
  salesSummary: SalesSummary[];
  purchaseSummary: PurchaseSummary[];
  expenseSummary: ExpenseSummary[];
  expenseByCategorySummary: ExpenseByCategorySummary[];
}

export interface Me {
  userId: string;
  name: string;
  email: string;
}

export interface logoutMessage {
  message: string;
}

export interface User {
  userId: string;
  name: string;
  email: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_PUBLIC_API_BASE_URL,credentials: 'include',}),
  reducerPath: "api",
  tagTypes: ["DashboardMetrics", "Products", "Users", "Expenses", "Login","SignUp", "Logout","Me"],
  endpoints: (build) => ({
    getDashboardMetrics: build.query<DashboardMetrics, void>({
      query: () => "/dashboard",
      providesTags: ["DashboardMetrics"],
    }),
    getProducts: build.query<Product[], string | void>({
      query: (search) => ({
        url: "/products",
        params: search ? { search } : {},
      }),
      providesTags: ["Products"],
    }),
    getLoggedInUser: build.query<Me, void>({
      query: () => "/me",
      providesTags: ["Me"],
    }),
    createProduct: build.mutation<Product, NewProduct>({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: build.mutation({
      query: (productId) => ({
        url: `products/${productId}`,
        method: 'DELETE',
      }),
    }),
    getUsers: build.query<User[], void>({
      query: () => "/users",
      providesTags: ["Users"],
    }),
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Login"],
    }),

    signUp: build.mutation<SignUpResponse, SignUpRequest>({
      query: (data) => ({
        url: "/auth/signUp",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SignUp"],
    }),
    getLogoutMetrics: build.query<logoutMessage, void>({
      query: () => "/auth/logout",
      providesTags: ["Logout"],
    }),
    
    getExpensesByCategory: build.query<ExpenseByCategorySummary[], void>({
      query: () => "/expenses",
      providesTags: ["Expenses"],
    }),
  }),
});

export const {
  useGetDashboardMetricsQuery,
  useGetLogoutMetricsQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetUsersQuery,
  useGetLoggedInUserQuery,
  useGetExpensesByCategoryQuery,
  useLoginMutation,
  useSignUpMutation
} = api;
