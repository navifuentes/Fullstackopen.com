import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="flex flex-col items-center">
    <Provider store={store}>
      <App />
    </Provider>
  </div>
);
