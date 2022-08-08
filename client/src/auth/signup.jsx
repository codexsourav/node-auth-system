import React, { useState } from "react";
import "./auth.css";
import { Link } from "react-router-dom";
import validator from "validator";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [user, setuser] = useState({
    name: "",
    email: "",
    uname: "",
    dob: "",
    pass: "",
  });

  // for error messages
  const [error, seterror] = useState({
    name: "",
    email: "",
    uname: "",
    dob: "",
    pass: "",
  });

  const formInput = (e) => {
    seterror({});
    let name = e.target.name;
    let value = e.target.value;
    setuser({ ...user, [name]: value });
  };

  const submitFrom = (e) => {
    seterror({});
    console.log(user);

    e.preventDefault();
    // // on empty error
    if (!user.name) {
      seterror({ ...error, name: "Please Enter Your Name" });
      return false;
    }
    if (!validator.isLength(user.name, { min: 2, max: 40 })) {
      seterror({ ...error, name: "Name must Be 2 to 40 Laters" });
      return false;
    }
    // for rmail validate
    if (!user.email) {
      seterror({ ...error, email: "Please Enter Your Email" });
      return false;
    }
    if (!validator.isEmail(user.email)) {
      seterror({ ...error, email: "Invalid Email ID" });
      return false;
    }
    //for username
    if (!user.uname) {
      seterror({ ...error, uname: "Please Enter Your Username" });
      return false;
    }
    if (!validator.isLength(user.uname, { min: 3 })) {
      seterror({ ...error, uname: "Username must Be 3 Laters" });
      return false;
    }
    if (!validator.isAlphanumeric(user.uname)) {
      seterror({ ...error, uname: "Invalid Username" });
      return false;
    }
    // for dob
    if (!validator.isDate(user.dob)) {
      seterror({ ...error, dob: "Please Enter Your Date Of Barth" });
      return false;
    }

    //for password
    if (!user.pass) {
      seterror({ ...error, pass: "Please Enter Your Password" });
      return false;
    }
    if (!validator.isLength(user.pass, { min: 6 })) {
      seterror({ ...error, pass: "Password Min 6 Carectors" });
      return false;
    }

    // fetch server respons e

    fetch("/signup", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.sts === false) {
          seterror({ ...error, [data.fld]: data.message });
          return false;
        }

        if (data.sts === true) {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        return false;
      });
  };

  return (
    <>
      <div className="form">
        <div className="form-toggle"></div>
        <div className="form-panel one">
          <div className="form-header">
            <h1>Create A New Account</h1>
          </div>

          <div className="form-content">
            <form method="post" onSubmit={submitFrom}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <span className="error">{error.name}</span>
                <input
                  onChange={formInput}
                  value={user.name}
                  type="text"
                  id="name"
                  name="name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Email ID</label>
                <span className="error">{error.email}</span>
                <input
                  onChange={formInput}
                  value={user.email}
                  type="text"
                  id="email"
                  name="email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <span className="error">{error.uname}</span>
                <input
                  onChange={formInput}
                  value={user.uname}
                  type="text"
                  id="uname"
                  name="uname"
                />
              </div>
              <div className="form-group">
                <label htmlFor="dob">Date Of Barth</label>
                <span className="error">{error.dob}</span>
                <input
                  onChange={formInput}
                  value={user.dob}
                  type="date"
                  id="dob"
                  name="dob"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <span className="error">{error.pass}</span>
                <input
                  onChange={formInput}
                  value={user.pass}
                  type="password"
                  id="pass"
                  name="pass"
                />
              </div>
              <div className="form-group">
                <label className="form-remember">
                  <input type="checkbox" />
                  Accept Privacy Policy
                </label>
              </div>
              <div className="form-group">
                <button type="submit">Register Now</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Link className="next" to="/">
        Alrady Have An Account Login
      </Link>
    </>
  );
};

export default Signup;
