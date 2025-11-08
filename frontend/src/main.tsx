import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "~/redux/store.ts";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import App from "./App.tsx";
import "./index.css";

// Inject redux store vào authorizedAxios
import { injectStore } from "~/utils/authorizedAxios";
injectStore(store);

const persistor = persistStore(store);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
