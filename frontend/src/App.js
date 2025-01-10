import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import { Dashboard } from "./pages/Dashboard";
import { Login } from "./components/Login";
import { Users } from "./pages/Users"
import { Products } from "./pages/Products";
import { AddUser } from "./pages/AddUser";
import { EditUser } from "./pages/EditUser";
import { AddProduct } from "./pages/AddProduct";
import { EditProduct } from "./pages/EditProduct";
import { AddTicket } from "./pages/AddTicket";
import { EditTicket } from "./pages/EditTicket";
import { Tickets } from "./pages/Tickets";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Login/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          
          <Route path="/users" element={<Users/>} />
          <Route path="/users/add" element={<AddUser/>} />
          <Route path="/users/edit/:id" element={<EditUser/>} />
          
          <Route path="/products" element={<Products/>} />
          <Route path="/products/add" element={<AddProduct/>} />
          <Route path="/products/edit/:id" element={<EditProduct/>} />

          <Route path="/tickets" element={<Tickets/>} />
          <Route path="/tickets/:status" element={<Tickets/>} />
          <Route path="/tickets/add" element={<AddTicket/>} />
          <Route path="/tickets/edit/:id" element={<EditTicket/>} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
