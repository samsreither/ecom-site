import { useState, SyntheticEvent } from "react";
import axios from "axios";

export const AuthPage = () => {
  return (
    <div className="auth">
      {" "}
      <Register /> <Login />{" "}
    </div>
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    await axios.post("http://localhost:3001/user/register", {
      username,
      password, // send the backend the user and the password with axios
    });
    alert("Registration Completed! Now Login.")
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
  return <div> Login </div>;
};
