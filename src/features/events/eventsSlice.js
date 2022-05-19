import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import eventService from '../../services/events';

export const fetchEvents = createAsyncThunk('events/fetchEvents', () => {
  return eventService.getEvents();
});

const eventSlice = createSlice({
  name: 'events',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      const events = action.payload;
      events.forEach((event) => {
        event.image.src = `${process.env.PUBLIC_URL}/events/${event.image.src}`;
      });
      return events;
    });
  },
});

export const selectEventById = (id) => (state) =>
  state.events.find((event) => event._id === id);

export default eventSlice.reducer;
