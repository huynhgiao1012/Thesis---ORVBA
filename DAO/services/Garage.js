import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IP, KEY_TOKEN} from '../utils/constants';
import {getLocalStorageByKey} from '../common/LocalStorage';

// Define a service using a base URL and expected endpoints

export const garageApi = createApi({
  reducerPath: 'garageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://dao-applicationservice.onrender.com/api/v1/garage`,
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
    getCorGarage: builder.mutation({
      query: () => ({
        url: '/getCorGarage',
      }),
    }),
    getGarageDetail: builder.mutation({
      query: ({id}) => ({
        url: `/getGarageDetail/${id}`,
      }),
    }),
    getSpecificCorGarage: builder.mutation({
      query: () => ({
        url: '/getSpecificCorGarage',
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetCorGarageMutation,
  useGetGarageDetailMutation,
  useGetSpecificCorGarageMutation,
} = garageApi;
