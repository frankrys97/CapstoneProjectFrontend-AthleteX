import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "aos/dist/aos.css";
import Aos from "aos";
import { Provider } from "react-redux";
import {store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";


Aos.init();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate> 
  </Provider>
);
