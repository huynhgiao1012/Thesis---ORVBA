import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {authApi} from '../services/Auth';
import {userApi} from '../services/User';
import {mapApi} from '../services/Map';
import authSlice from '../slices/authSlice';
import {serviceApi} from '../services/Service';
import {notiApi} from '../services/Notification';
import {formApi} from '../services/OrderForm';
import {fbApi} from '../services/Feedback';
import {customerApi} from '../services/Customer';
import {garageApi} from '../services/Garage';
import {mechanicApi} from '../services/Mechanic';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [mapApi.reducerPath]: mapApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
    [notiApi.reducerPath]: notiApi.reducer,
    [formApi.reducerPath]: formApi.reducer,
    [fbApi.reducerPath]: fbApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    [garageApi.reducerPath]: garageApi.reducer,
    [mechanicApi.reducerPath]: mechanicApi.reducer,
    authSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      mapApi.middleware,
      serviceApi.middleware,
      notiApi.middleware,
      formApi.middleware,
      fbApi.middleware,
      customerApi.middleware,
      garageApi.middleware,
      mechanicApi.middleware,
    ),
});
setupListeners(store.dispatch);
