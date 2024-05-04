import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IP, KEY_TOKEN} from '../utils/constants';
import {getLocalStorageByKey} from '../common/LocalStorage';

// Define a service using a base URL and expected endpoints

export const serviceApi = createApi({
  reducerPath: 'serviceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://dao-applicationservice.onrender.com/api/v1/service`,
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
    getCompanyService: builder.mutation({
      query: ({id}) => ({
        url: `/getAllService/${id}`,
      }),
    }),
    getSubService: builder.mutation({
      query: ({id}) => ({
        url: `/getSubService/${id}`,
      }),
    }),
    bookingService: builder.mutation({
      query: payload => ({
        url: '/bookingService',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    addService: builder.mutation({
      query: payload => ({
        url: '/create',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    updateService: builder.mutation({
      query: ({id, ...payload}) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    deleteService: builder.mutation({
      query: ({id}) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetCompanyServiceMutation,
  useGetSubServiceMutation,
  useBookingServiceMutation,
  useAddServiceMutation,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} = serviceApi;
