import "./index.css";
import { App } from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "@store/store.ts";
import { initI18n } from "./locale/utils.ts";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

initI18n(() => {
  createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
  );
});
