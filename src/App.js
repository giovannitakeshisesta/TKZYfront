import { Route, Routes, useLocation } from "react-router-dom";
import "./style/App.scss";
import ProtectedRoute from "./guards/ProtectedRoute";
import ProtectedRouteLogReg from "./guards/ProtectedRouteLogReg";
import { useAuthContext } from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import LandingPage from "./views/LandingPage";
import Login from "./views/Login";
import Register from "./views/Register";
import MenuPage from "./views/MenuPage";
import TablesPage from "./views/TablesPage";
import Navbar from "./components/Navbar";
import Spinner from "./components/Spinner/Spinner";
import KitchenPage from "./views/KitchenPage";

function App() {
  const { isAuthenticationFetched } = useAuthContext();
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && <Navbar />}

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: {
            background: "#363636",
            color: "#fff",
          }
        }}
      />

      <div className="appBody">
        {!isAuthenticationFetched ? (
          <Spinner/>
        ) : (
          <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route path="/" element={<ProtectedRouteLogReg />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/tablesPage" element={<TablesPage />} />
              <Route path="/kitchenPage" element={<KitchenPage />} />
            </Route>
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;
