import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import AdminLayout from "./components/admin/layout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import AdminFeatures from "./pages/admin/Features";
import ShopLayout from "./components/shop/layout";
import NotFound from "./pages/not-found";
import ShopHomePage from "./pages/shop/HomePage";
import ShopListing from "./pages/shop/Listing";
import ShopAccount from "./pages/shop/Account";
import ShopCheckout from "./pages/shop/Checkout";
import CheckAuth from "./components/common/CheckAuth";

function App() {
  const isAuthenticated = false;
  const user = {
    name: "x",
    role: "admin",
  };

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <h1>HEADING</h1>
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="register" element={<Register />}></Route>
          <Route path="login" element={<Login />}></Route>
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />}></Route>
          <Route path="products" element={<AdminProducts />}></Route>
          <Route path="orders" element={<AdminOrders />}></Route>
          <Route path="features" element={<AdminFeatures />}></Route>
        </Route>

        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShopLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShopHomePage />}></Route>
          <Route path="listing" element={<ShopListing />}></Route>
          <Route path="account" element={<ShopAccount />}></Route>
          <Route path="checkout" element={<ShopCheckout />}></Route>
        </Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
