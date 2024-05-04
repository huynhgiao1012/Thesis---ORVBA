import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_KEY} from '../utils/constants';
// Define a service using a base URL and expected endpoints

export const mapApi = createApi({
  reducerPath: 'mapApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rsapi.goong.io',
  }),
  tagTypes: ['Map'],
  endpoints: builder => ({
    distanceMatrix: builder.mutation({
      query: ({latitude, longitude, string}) => ({
        url: `/DistanceMatrix?origins=${latitude},${longitude}&destinations=${string}&vehicle=truck&api_key=${API_KEY}`,
      }),
      invalidatesTags: ['Map'],
    }),
    reverseGeo: builder.mutation({
      query: ({latitude, longitude}) => ({
        url: `/Geocode?latlng=${latitude},%20${longitude}&api_key=${API_KEY}`,
      }),
      invalidatesTags: ['Map'],
    }),
    detailPlace: builder.mutation({
      query: ({placeId}) => ({
        url: `/Place/Detail?place_id=${placeId}&api_key=${API_KEY}`,
      }),
      invalidatesTags: ['Map'],
    }),
    forwardGeo: builder.mutation({
      query: ({address}) => ({
        url: `/geocode?address=${address}&api_key=${API_KEY}`,
      }),
      invalidatesTags: ['Map'],
    }),
    directionPath: builder.mutation({
      query: ({origins, destinations}) => ({
        url: `/Direction?origin=${origins.lat},${origins.lng}&destination=${destinations.lat},${destinations.lng}&vehicle=truck&api_key=${API_KEY}`,
      }),
      invalidatesTags: ['Map'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useDistanceMatrixMutation,
  useReverseGeoMutation,
  useDetailPlaceMutation,
  useForwardGeoMutation,
  useDirectionPathMutation,
} = mapApi;
