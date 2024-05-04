import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IP, KEY_TOKEN} from '../utils/constants';
import {clearStorage, getLocalStorageByKey} from '../common/LocalStorage';

// Define a service using a base URL and expected endpoints

export const mechanicApi = createApi({
  reducerPath: 'mechanicApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://dao-applicationservice.onrender.com/api/v1/mechanic`,
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
    getMePoint: builder.mutation({
      query: () => ({
        url: '/getMePoint',
      }),
    }),
    getForms: builder.mutation({
      query: () => ({
        url: '/getForms',
      }),
    }),
    getPickedForms: builder.mutation({
      query: () => ({
        url: '/getPickedForms',
      }),
    }),
    getHoldingForms: builder.mutation({
      query: () => ({
        url: '/getHoldingForms',
      }),
    }),
    getCarSparesMe: builder.mutation({
      query: () => ({
        url: '/getCarSparesMe',
      }),
    }),
    getSubCarSpareMe: builder.mutation({
      query: ({id}) => ({
        url: `/getSubCarSpareMe/${id}`,
      }),
    }),
    getPayInfo: builder.mutation({
      query: ({id}) => ({
        url: `/getPayInfo/${id}`,
      }),
    }),
    pickForm: builder.mutation({
      query: ({id}) => ({
        url: `/pickForm/${id}`,
        method: 'POST',
      }),
    }),
    updateBefore: builder.mutation({
      query: ({id, ...payload}) => ({
        url: `updateBefore/${id}`,
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    updateAfter: builder.mutation({
      query: ({id, ...payload}) => ({
        url: `updateFinish/${id}`,
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    getAllService: builder.mutation({
      query: () => ({
        url: '/getAllService',
      }),
    }),
    getGarageStaff: builder.mutation({
      query: () => ({
        url: '/getGarageStaff',
      }),
    }),
    getCustomer: builder.mutation({
      query: ({id}) => ({
        url: `/getCustomer/${id}`,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetMePointMutation,
  useGetFormsMutation,
  usePickFormMutation,
  useGetPickedFormsMutation,
  useUpdateBeforeMutation,
  useGetCarSparesMeMutation,
  useGetSubCarSpareMeMutation,
  useUpdateAfterMutation,
  useGetPayInfoMutation,
  useGetHoldingFormsMutation,
  useGetAllServiceMutation,
  useGetGarageStaffMutation,
  useGetCustomerMutation,
} = mechanicApi;
