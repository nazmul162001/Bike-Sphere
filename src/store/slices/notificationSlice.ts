import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}

export interface NotificationState {
  items: AppNotification[];
}

const initialState: NotificationState = {
  items: [],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: {
      reducer(state, action: PayloadAction<AppNotification>) {
        state.items.unshift(action.payload);
      },
      prepare(input: Omit<AppNotification, "id" | "read" | "createdAt">) {
        return {
          payload: {
            ...input,
            id: nanoid(),
            read: false,
            createdAt: new Date().toISOString(),
          },
        };
      },
    },
    markRead(state, action: PayloadAction<string>) {
      const item = state.items.find((notification) => notification.id === action.payload);
      if (item) item.read = true;
    },
  },
});

export const { addNotification, markRead } = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
