import { useState, SyntheticEvent } from "react";
import axios from "axios";
import { UserErrors } from "../../models/errors";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom"; // to navigate btwn the different routes

export const AuthPage = () => {
  return (
    <div className="auth">
      {" "}
      <Register /> <Login />{" "}
    </div>
  );
};

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
    await axios.post("http://localhost:3001/user/register", {
      username,
      password, // send the backend the user and the password with axios
    });
    alert("Registration Completed! Now Login.")
} catch(err) {
    if (err.response?.data?.type === UserErrors.USERNAME_ALREADY_EXISTS) {
        alert("ERROR: Username already in use.") // these errors were created in the backend first
    } else {
        alert("ERROR: Something went wrong.")
    }
}
  };

  return (
    <div className="auth-containeer">
      {" "}
      <form onSubmit={handleSubmit}>
        <h2> Register </h2>
        <div className="form-group">
          <label htmlFor="username"> Username: </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          {/* update username dynamically to give user feedback aka "username is taken, etc" */}
        </div>

        <div className="form-group">
          <label htmlFor="password"> Password: </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button type="submit"> Register </button>
      </form>
    </div>
  );
};

const Login = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [_, setCookies] = useCookies(["access_token"]);

    const navigate = useNavigate()
  
    const handleSubmit = async (event: SyntheticEvent) => {
      event.preventDefault();
      try {
      const result = await axios.post("http://localhost:3001/user/login", {
        username,
        password,
      });
      setCookies("access_token", result.data.token); // setting token and userID in local storage - can view in application tab of browser
      localStorage.setItem("userID", result.data.userID);
      navigate("/"); // after we log in, navigate to shopping route (empty route)
      // catch all of the different errors that can occur upon logging in
  } catch(err) {
        let errorMessage: string = ""
        switch (err.response?.data?.type) {
            case UserErrors.NO_USER_FOUND:
                errorMessage = "User doesn't exist"
                break;
            case UserErrors.WRONG_CREDENTIALS:
                errorMessage = "Wrong username/password combination"
                break;
            default:
                errorMessage = "Something went wrong"
        }

        alert("ERROR: " + errorMessage)

      if (err.response?.data?.type === UserErrors.USERNAME_ALREADY_EXISTS) {
          alert("ERROR: Username already in use.") // these errors were created in the backend first
      } else {
          alert("ERROR: Something went wrong.")
      }
  }
    };
  
    return (
      <div className="auth-containeer">
        {" "}
        <form onSubmit={handleSubmit}>
          <h2> Login </h2>
          <div className="form-group">
            <label htmlFor="username"> Username: </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            {/* update username dynamically to give user feedback aka "username is taken, etc" */}
          </div>
  
          <div className="form-group">
            <label htmlFor="password"> Password: </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
  
          <button type="submit"> Register </button>
        </form>
      </div>
    );
  };
