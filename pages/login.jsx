import { useContext, useEffect } from "react";
import { Mycontext } from "../src/App";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, useScrollTrigger } from "@mui/material";
import kilologo from "../src/assets/killo-removebg-preview.png";
import axios from "axios";
import API_BASE from "../src/api.js";
import { useState } from "react";

function Showloggingline(props) {
  return (
    <p>
      Logging you in {props.email.substring(0, props.email.indexOf("@"))}.
      Please Wait...
    </p>
  );
}
function Login() {
  const navigate = useNavigate();
  const { islogin, setislogin, username, setusername } = useContext(Mycontext);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showlogging, setshowlogging] = useState(false);

  useEffect(() => {
    setislogin(true);
  }, []);

  async function checkusercred() {
    setshowlogging(true);
    try {
      const res = await axios.post(
        `${API_BASE}/admin/login`,
        {
          email: email,
          password: password,
        }
      );

      if (res.status == 200) {
        alert("Logged in Successfully!");
        setusername(res.data.name);
        localStorage.setItem("adminname", res.data.name);
        setshowlogging(false);
        navigate("/dashboard");
      } else {
        alert(res.data.message);
      }
    } catch (e) {
      console.log("There is some error while logging in " + e);
    }
  }

  return (
    <section className="container">
      <div className="loginsection ">
        <div className="loginform">
          <Link to="https://www.kilograms.in" className="mb-3">
            <img src={kilologo} style={{ width: "120px" }} alt="" />
          </Link>

          <div className="adminemail">
            <input
              name="email"
              value={email}
              type="text"
              onChange={(e) => {
                setemail(e.target.value);
              }}
              placeholder="Enter Email Address"
              autoFocus
            />
          </div>

          <div className="adminemail">
            <input
              name="password"
              value={password}
              type="text"
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          <Link className="w-100 mt-4">
            <Button className="Loginbutton" onClick={() => checkusercred()}>
              Login
            </Button>
          </Link>
          <br />

          {showlogging === true && <Showloggingline email={email} />}
        </div>
      </div>
    </section>
  );
}

export default Login;
