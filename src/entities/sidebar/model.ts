import { createEvent, createStore } from "effector";

export const toggleSidebar = createEvent();
export const openSidebar = createEvent();
export const closeSidebar = createEvent();

export const $isSidebarOpen = createStore(true)
  .on(openSidebar, () => true)
  .on(closeSidebar, () => false)
  .on(toggleSidebar, (state) => !state);

export const setChatId = createEvent<string>();
export const $chatId = createStore<string>("1").on(setChatId, (_, chatId) => chatId);
