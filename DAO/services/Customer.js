import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IP, KEY_TOKEN} from '../utils/constants';
import {clearStorage, getLocalStorageByKey} from '../common/LocalStorage';

// Define a service using a base URL and expected endpoints

export const customerApi = createApi({
  reducerPath: 'customerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://dao-applicationservice.onrender.com/api/v1/customer`,
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
    getCustomerDetail: builder.mutation({
      query: () => ({
        url: '/customerDetail',
      }),
    }),
    getCustomerPoint: builder.mutation({
      query: () => ({
        url: '/customerPoint',
      }),
    }),
    getAllForm: builder.mutation({
      query: () => ({
        url: '/getAllForm',
      }),
    }),
    getAllFormTime: builder.mutation({
      query: ({id, ...payload}) => ({
        url: `/getAllFormTime/${id}`,
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    getEmergencyForm: builder.mutation({
      query: () => ({
        url: '/getEmergencyForm',
      }),
    }),
    getMaintainForm: builder.mutation({
      query: () => ({
        url: '/getMaintainForm',
      }),
    }),
    bookingMaintenance: builder.mutation({
      query: payload => ({
        url: '/bookingMaintenance',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    // updateUserPoint: builder.mutation({
    //   query: payload => ({
    //     url: `/updateUserPoint`,
    //     method: 'PATCH',
    //     body: payload,
    //     headers: {
    //       'Content-type': 'application/json; charset=UTF-8',
    //     },
    //   }),
    // }),
    // updateInfo: builder.mutation({
    //   query: payload => ({
    //     url: `/`,
    //     method: 'PATCH',
    //     body: payload,
    //     headers: {
    //       'Content-type': 'application/json; charset=UTF-8',
    //     },
    //   }),
    // }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetCustomerDetailMutation,
  useGetCustomerPointMutation,
  useBookingMaintenanceMutation,
  useGetAllFormMutation,
  useGetEmergencyFormMutation,
  useGetMaintainFormMutation,
  useGetAllFormTimeMutation,
} = customerApi;
