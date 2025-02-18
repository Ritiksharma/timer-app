import { createAction } from '@reduxjs/toolkit';
import { Timer } from '../types/timer.ts';

export const addTimer = createAction<Omit<Timer, 'id' | 'createdAt'>>('ADD_TIMER');
export const deleteTimer = createAction<string>('DELETE_TIMER');
export const toggleTimer = createAction<string>('TOGGLE_TIMER');
export const updateTimer = createAction<{ id: string; updates: Partial<Timer> }>('UPDATE_TIMER');
export const restartTimer = createAction<string>('RESTART_TIMER');
export const editTimer = createAction<{ id: string; updates: Partial<Timer> }>('EDIT_TIMER');