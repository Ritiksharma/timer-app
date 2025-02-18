import { createReducer } from '@reduxjs/toolkit';
import { addTimer, deleteTimer, toggleTimer, updateTimer, restartTimer, editTimer } from './useTimerStore';
import { Timer }  from '../types/timer';

const initialState: Timer[] = [];

const timerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addTimer, (state, action) => {
      const newTimer: Timer = {
        ...action.payload,
        id: generateUniqueId(),
        createdAt: new Date().getTime(),
        isRunning: false,
        remainingTime: action.payload.duration,
      };
      state.push(newTimer);
    })
    .addCase(deleteTimer, (state, action) => {
      return state.filter(timer => timer.id !== action.payload);
    })
    .addCase(toggleTimer, (state, action) => {
      const timer = state.find(timer => timer.id === action.payload);
      if (timer) {
        timer.isRunning = !timer.isRunning;
      }
    })
    .addCase(updateTimer, (state, action) => {
      const timer = state.find(timer => timer.id === action.payload.id);
      if (timer && timer.isRunning) {
        timer.remainingTime -= 1;
        timer.isRunning = timer.remainingTime > 0;
      }
    })
    .addCase(restartTimer, (state, action) => {
      const timer = state.find(timer => timer.id === action.payload);
      if (timer) {
        timer.remainingTime = timer.duration;
        timer.isRunning = false;
      }
    })
    .addCase(editTimer, (state, action) => {
      const timer = state.find(timer => timer.id === action.payload.id);
      if (timer) {
        Object.assign(timer, action.payload.updates);
      }
    });
});

export default timerReducer;

function generateUniqueId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}