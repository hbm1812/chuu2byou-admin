import React from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/reset.css";
import store from "./stores";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import AppRoutes from "./routes";
import {AccountProvider} from "./context/ContextAccount";
import {MenuProvider} from "./context/ContextMenu";

const isDev = import.meta.env.VITE_NODE_ENV === "dev";

const RootComponent = isDev ? (
    <React.StrictMode>
        <Provider store={store}>
            <AccountProvider>
                <MenuProvider>
                    <BrowserRouter>
                        <AppRoutes/>
                    </BrowserRouter>
                </MenuProvider>
            </AccountProvider>
        </Provider>
    </React.StrictMode>
) : (
    <Provider store={store}>
        <AccountProvider>
            <MenuProvider>
                <BrowserRouter>
                    <AppRoutes/>
                </BrowserRouter>
            </MenuProvider>
        </AccountProvider>
    </Provider>
);

ReactDOM.createRoot(document.getElementById("root")!).render(RootComponent);
