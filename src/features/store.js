import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { encryptTransform } from "redux-persist-transform-encrypt";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import investmentTimelineRedcuer from "../features/slices/Portfolio/investmentTimelineSlice";

import teamsReducer from "../features/slices/teamsSlice";
import teamDetailsReducer from "../features/slices/teamDetailsSlice";
import focusAreaReducer from "../features/slices/focusAreaSlice";
import portfolioReducer from "../features/slices/Portfolio/portfolioSlice";
import portFolioCardsReducer from "../features/slices/Portfolio/portfolioCardsSlice";
import investmentTimelineCardsReducer from "../features/slices/Portfolio/investmentTimelineCardsSlice";
import investerReducer from "../features/slices/coInvestorSlice";
// import newsReducer from "../features/slices/newsSlice";
import blogsReducer from "../features/slices/Blogs/blogsSlice";
import contactsReducer from "../features/slices/contactSlice";
import impactReducer from "../features/slices/Impact/impactSlice";

const persistConfig = {
  key: "Transition_CMS_Admin",
  version: 1,
  storage,
  transforms: [
    encryptTransform({
      secretKey: `${import.meta.env.VITE_REDUX_PERSIST_SECRET_KEY}`,
      onError: (err) => {
        console.log("Redux Persist Encryption Failed: ", err);
      },
    }),
  ],
  // if you do not want to persist this part of the state
  // blacklist: ["omitedPart"],
};

const reducer = combineReducers({
  //   news: newsReducer,
  teams: teamsReducer,
  teamDetails: teamDetailsReducer,
  blogs: blogsReducer,
  contacts: contactsReducer,

  impacts: impactReducer,
  focusArea: focusAreaReducer,
  portfolioCards: portFolioCardsReducer,
  portfolios: portfolioReducer,
  investmentTimelineCards: investmentTimelineCardsReducer,
  coInvestors: investerReducer,
  listInvestTime: investmentTimelineRedcuer,
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_APP") {
    state = undefined;
  }
  return reducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.VITE_WORKING_ENVIRONMENT !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);

export default store;
