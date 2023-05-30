import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Title from "../components/Title";

const initialState = {
  username: "",
  password: "",
  confirmingPw: "",
  submit: true,
};

export default function RegisterPage() {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const [usernames, setUsernames] = useState([]);
  const [sentence, setSentence] = useState("");

  const asignName = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.value });
    console.log(formData);
  };

  const asignPw = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      username: formData.username,
      password: formData.confirmingPw,
      bank: 400,
    };

    const options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    fetch(`${process.env.REACT_APP_databaseUrl}/users`, options).then((res) =>
      res.json()
    );
    navigate(`/${formData.username}/Noro's_Poker_Club`);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_dataStoreUrl}/users`)
      .then((res) => res.json())
      .then((data) => setUsernames(data));

    usernames.find((item) => {
      if (item.username === formData.username) {
        setSentence(
          `User "${formData.username}" already exists, please choose another username.`
        );
        setFormData({ ...formData, submit: true });
      } else {
        setSentence("");
        if (
          formData.confirmingPw === formData.password &&
          formData.password.length > 5
        ) {
          setFormData({ ...formData, submit: false });
        }
      }
    });
  }, [formData.confirmingPw, formData.username]);

  return (
    <>
      <Title />
      <div className="formholder">
        <form className="form" onSubmit={handleSubmit}>
          <label>
            New username:
            <input
              type="text"
              minLength={5}
              maxLength={10}
              name="username"
              onChange={asignName}
              value={formData.username}
              required
            />
          </label>
          <p>{sentence}</p>
          <label>
            Set password:
            <input
              name="password"
              minLength={5}
              maxLength={10}
              onChange={asignName}
              type="password"
              required
            />
          </label>
          <label>
            Confirm password:
            <input
              type="password"
              minLength={5}
              maxLength={10}
              onChange={asignPw}
              name="confirmingPw"
              required
            />
          </label>
          <input disabled={formData.submit} type="submit" value="Confirm" />
          <Link to="/">Back to Login</Link>
        </form>
      </div>
    </>
  );
}
