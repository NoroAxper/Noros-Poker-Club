import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Title from "../components/Title";

const initialState = {
  user: "",
  password: "",
  submit: true,
  sentence: "",
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [log, setLog] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_dataStoreUrl}/users`)
      .then((res) => res.json())
      .then((data) =>
        data.find((item) => {
          if (item.username === log.name) {
            if (item.password === log.password) {
              navigate(`/${item.username}/Noro's_Poker_Club`);
            } else {
              setLog({ ...log, sentence: "Username or password don't match" });
            }
          } else {
            setLog({ ...log, sentence: "Username not found" });
          }
        })
      );
  };
  const handleChange = (e) => {
    const { name } = e.target;
    setLog({ ...log, [name]: e.target.value });
  };

  return (
    <>
      <Title />
      <div className="formholder">
        <form className="form" onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" name="name" required onChange={handleChange} />
          </label>
          <p>{log.sentence}</p>
          <label>
            Password:
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
            />
          </label>
          <Link to="/register">Register account</Link>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
}
