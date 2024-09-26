import "./login.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React from "react";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../Context/AuthProvider";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = ({setAuthenticated}) => {
  const { setAuth } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");


  const navigate = useNavigate()

  

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://medical-clinic.serv00.net/api/login",
        {
          username,
          password,
        }
      );

      
      const accessToken = await response?.data?.data?.token;
      const roles = response?.data?.data?.role;


      if(accessToken && roles && roles.id !== undefined){
        setAuth({ username, password, accessToken, roles});
        if(roles.id === 1){
          setAuthenticated(true)
          navigate('/super-admin')
        }
        else if(roles.id === 2 ){
          setAuthenticated(true)
          navigate('/super-admin')
        }
      }

      setUsername("");
      setPassword("");
      

      // console.log(roles);



    } catch (err) {
      if (!err?.response) {
        setErrMsg("no Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missin UserName or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("login Failed");
      }
    }
  };
  return (
    <div className="perant">
    <section className="login__perant ">
      <p
        style={{
          maxWidth: "130%",
          background: "rgb(180, 71, 71)",
          padding: "10px",
          display: errMsg ? "block" : "none",
          borderRadius: "3px",
        }}
      >
        {errMsg}
      </p>
      <h1 style={{ textAlign: "center" }}>login</h1>
      <form action="" onSubmit={handleSubmit}>
        <div style={{ margin: "30px 0" }}>
          <TextField
            type="text"
            id="outlined-basic"
            label="user name"
            variant="outlined"
            style={{ width: "100%" }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div style={{ margin: "0 0 30px 0" }}>
          <TextField
            type="password"
            id="outlined-basic"
            label="password"
            variant="outlined"
            style={{ width: "100%" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <Button style={{ width: "100%" }} variant="contained" type="submit">
            login
          </Button>
        </div>
      </form>
    </section>
    </div>
  );
};

export default Login;
