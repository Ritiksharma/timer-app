import { configureStore } from '@reduxjs/toolkit';
import timerReducer from './timerReducer.ts';

const mockStore = configureStore({
  reducer: {
    timers: timerReducer,
  },
});

export default mockStore;