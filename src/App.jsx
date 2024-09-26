import "./App.css";
import Login from "./components/login/login";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { useContext, useEffect, useState } from "react";
import AuthContext from "./Context/AuthProvider";
import { AddClinic } from "./components/AddClinic/AddClinic";
import AddAdmin from "./components/AddAdmin/AddAdmin";
import axios from "axios";

function App() {
  const { auth } = useContext(AuthContext);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [city, setCity] = useState([]);

  const getDataCity = async () => {
    try {
      const response = await axios.get(
        "https://medical-clinic.serv00.net/api/city",
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      setCity(response.data.data);
    } catch (error) {
      console.error("There was an error making the request:", error);
    }
  };

  useEffect(() => {
    getDataCity()
  })

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
              <AddClinic city={city} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-admin"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AddAdmin city={city} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
