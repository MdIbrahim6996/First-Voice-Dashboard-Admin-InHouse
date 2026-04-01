import "core-js/stable";
import "regenerator-runtime/runtime";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "./index.css";
// import App from "./App.tsx";
import AppV2 from "./v2/App.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <AppV2 />
            {/* <App /> */}
        </QueryClientProvider>
    </StrictMode>
);
