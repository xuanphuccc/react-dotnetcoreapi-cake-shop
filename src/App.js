import { BrowserRouter, Routes, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";
import { Fragment, useEffect } from "react";
import productApi from "./api/productApi";
import { useDispatch } from "react-redux";
import globalSlice from "./redux/globalSlice";
import categoryApi from "./api/categoryApi";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleGetInformations = async () => {
      dispatch(globalSlice.actions.setLoading(true));

      const response = await Promise.all([productApi.getAll(), categoryApi.getAll()]);

      dispatch(globalSlice.actions.setProducts(response[0]?.data?.data ?? []));
      dispatch(globalSlice.actions.setCategories(response[1]?.data?.data ?? []));

      dispatch(globalSlice.actions.setLoading(false));
    };
    handleGetInformations();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
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

        {/* Private routes */}
        {privateRoutes.map((route, index) => {
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
