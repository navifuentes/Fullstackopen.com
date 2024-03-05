import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="bg-cyan-300">
    <Provider store={store}>
      <App />
    </Provider>
  </div>
);
