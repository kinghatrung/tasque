import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "~/redux/store.ts";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

// React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import "./index.css";

// Inject redux store vào authorizedAxios
import { injectStore } from "~/utils/authorizedAxios";
injectStore(store);

const persistor = persistStore(store);
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
