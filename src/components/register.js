import { Container, Form, Button } from "react-bootstrap";
import ReactTypingEffect from "react-typing-effect";
import axios from "axios";
import { useState } from "react";

const Register = ({ title, description }) => {
  const [nip, setNIP] = useState("");
  const [nama, setNama] = useState("");
  const [password, setPassword] = useState("");
  const handleNIP = (inputNIP) => {
    setNIP(inputNIP);
  };
  const handleNama = (inputNama) => {
    setNama(inputNama);
  };
  const handlePassword = (inputPassword) => {
    setPassword(inputPassword);
  };
  const userRegister = () => {
    console.log("user register ready");
    //data user guwe adalah nip : 900, password : 123
    const requestingData = {
      nip: nip,
      nama: nama,
      password: password,
    };
    axios({
      method: "POST",
      url: "http://localhost:3200/users",
      data: requestingData,
    })
      .then((result) => {
        console.log(result.data);
        if (result.data.registered) {
          alert("Pendaftaran Berhasil");
          window.location.replace("/login");
        } else {
          alert("Gagal mendaftar, coba dengan NIP");
        }
      })
      .catch((e) => alert("e"));
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
          <Form.Label className="fw-bold">Nama</Form.Label>
          <Form.Control
            placeholder="Masukkan Nama anda"
            type="text"
            required
            onChange={(event) => handleNama(event.target.value)}
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
        <Button className="mt-4 w-100" onClick={() => userRegister()}>
          Daftar Sekarang
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
