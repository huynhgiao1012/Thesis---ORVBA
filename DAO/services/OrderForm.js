import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IP, KEY_TOKEN} from '../utils/constants';
import {clearStorage, getLocalStorageByKey} from '../common/LocalStorage';

// Define a service using a base URL and expected endpoints

export const formApi = createApi({
  reducerPath: 'formApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://dao-applicationservice.onrender.com/api/v1/form`,
    prepareHeaders: async (headers, query) => {
      const Token = await getLocalStorageByKey(KEY_TOKEN);
      if (Token) {
        headers.set('authorization', `Bearer ${Token}`);
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    getAllFormCustomer: builder.mutation({
      query: () => ({
        url: `/getAllFormCustomer`,
      }),
    }),
    getAllFormGarage: builder.mutation({
      query: () => ({
        url: `/getAllFormGarage`,
      }),
    }),
    updateProcess: builder.mutation({
      query: ({id}) => ({
        url: `/updateProcess/${id}`,
        method: 'PATCH',
      }),
    }),
    updateDone: builder.mutation({
      query: ({id}) => ({
        url: `/updateDone/${id}`,
        method: 'PATCH',
      }),
    }),
    getFormDetail: builder.mutation({
      query: ({id}) => ({
        url: `/getFormDetail/${id}`,
      }),
    }),
    getFormNotFeed: builder.mutation({
      query: () => ({
        url: `/getFormNotFeed`,
      }),
    }),
    getFormFeed: builder.mutation({
      query: () => ({
        url: `/getFormFeed`,
      }),
    }),
    deleteForm: builder.mutation({
      query: ({id}) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
    createPaymentIntent: builder.mutation({
      query: data => ({
        url: '/intent',
        method: 'POST',
        body: data,
      }),
    }),
    payment: builder.mutation({
      query: ({id}) => ({
        url: `/payment/${id}`,
        method: 'PATCH',
      }),
    }),
  }),
});
export const {
  useGetAllFormCustomerMutation,
  useGetAllFormGarageMutation,
  useUpdateDoneMutation,
  useUpdateProcessMutation,
  useGetFormDetailMutation,
  useDeleteFormMutation,
  useCreatePaymentIntentMutation,
  usePaymentMutation,
  useGetFormNotFeedMutation,
  useGetFormFeedMutation,
} = formApi;
