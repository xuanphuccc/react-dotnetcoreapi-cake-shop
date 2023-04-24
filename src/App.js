import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";
import { Fragment } from "react";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;
                    let Layout = Fragment;

                    if (route.layout) {
                        Layout = route.layout;
                    }

                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        ></Route>
                    );
                })}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
