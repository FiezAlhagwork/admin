import "./App.css";
import Login from "./components/login/login";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { useContext, useState } from "react";
import AuthContext from "./Context/AuthProvider";
import { AddClinic } from "./components/AddClinic/AddClinic";
import AddAdmin from "./components/AddAdmin/AddAdmin";

function App() {
  const { auth } = useContext(AuthContext);
  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <div className="App ">
      {/* <DrawerAppBar/> */}
      <Routes>
        <Route
          path="/"
          element={<Login setAuthenticated={setAuthenticated} />}
        />

        <Route
          path="/super-admin"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AddClinic />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-admin"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AddAdmin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
