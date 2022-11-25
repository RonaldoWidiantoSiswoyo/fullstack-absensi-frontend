import { Container, Form, Button } from "react-bootstrap";
import ReactTypingEffect from "react-typing-effect";
import axios from "axios";
import { useState } from "react";

const Login = ({ title, description }) => {
  const [nip, setNIP] = useState("");
  const [password, setPassword] = useState("");
  const handleNIP = (inputNIP) => {
    setNIP(inputNIP);
  };
  const handlePassword = (inputPassword) => {
    setPassword(inputPassword);
  };
  const userLogin = () => {
    console.log("user login ready");
    //data user guwe adalah nip : 900, password : 123
    const requestingData = {
      nip: nip,
      password: password,
    };
    axios({
      method: "POST",
      url: "http://localhost:3200/users/login",
      data: requestingData,
    }).then((result) => {
      localStorage.setItem("nip", result.data.users.nip);
      localStorage.setItem("nama", result.data.users.nama);
      window.location.replace("/dashboard");
    });
    //   .finally(() => console.log("askdjkas"));
  };

  return (
    <Container>
      <div className="d-flex justify-content-center fw-bold h3 my-4">
        <ReactTypingEffect
          text={[title, description]}
          speed={100}
          eraseDelay={800}
          eraseSpeed={100}
          typingDelay={100}
        />
      </div>
      <Form className="w-50 mx-auto flex-column">
        <Form.Group>
          <Form.Label className="fw-bold">NIP</Form.Label>
          <Form.Control
            placeholder="Masukkan NIP anda"
            type="number"
            required
            onChange={(event) => handleNIP(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="fw-bold">Password</Form.Label>
          <Form.Control
            placeholder="Masukkan password anda"
            type="password"
            required
            onChange={(event) => handlePassword(event.target.value)}
          />
        </Form.Group>
        <Button className="mt-4 w-100" onClick={() => userLogin()}>
          Login Sekarang
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
