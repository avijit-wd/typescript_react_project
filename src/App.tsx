import React from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import User from "./pages/Users/User";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateUser from "./pages/Users/CreateUser";
import EditUser from "./pages/Users/EditUser";
import Roles from "./pages/Roles/Roles";
import RoleCreate from "./pages/Roles/RoleCreate";
import RoleEdit from "./pages/Roles/RoleEdit";
import Products from "./pages/Products/Products";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<User />} />
          <Route path="/users/create" element={<CreateUser />} />
          <Route path="/users/:id/edit" element={<EditUser />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/roles/create" element={<RoleCreate />} />
          <Route path="/roles/:id/edit" element={<RoleEdit />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
