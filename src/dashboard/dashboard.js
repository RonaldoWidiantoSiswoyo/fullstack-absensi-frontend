import { useEffect, useState } from "react";
import { Container, Button, Badge } from "react-bootstrap";
import axios from "axios";
import Navbarr from "./navbar";
import Edit from "./edit";
import { logout } from "./logout";

function Dashboard({ title }) {
  const [absensiList, setAbsensiList] = useState([]);
  const [absenNotif, setAbsenNotif] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("nama") && !localStorage.getItem("nip")) {
      console.log("user belum login");
      window.location.replace("/login");
    }
    axios({
      method: "GET",
      url: "http://localhost:3200/absensi",
    }).then((result) => setAbsensiList(result.data.absensi));
  }, [absenNotif]);

  const absen = (params) => {
    const requestingData = {
      nip: localStorage.getItem("nip"),
    };
    axios({
      method: "POST",
      url: `http://localhost:3200/absensi/${params}`,
      data: requestingData,
    }).then((result) => {
      setAbsenNotif(!absenNotif);
    });
  };

  return (
    <Container>
      <main className="col-md-12 ms-sm-auto col-lg-12 px-md-4">
        <Navbarr />
        <h2>{title}</h2>
        <div>
          <p>Hello {localStorage.getItem("nama")}!</p>
          <p>nip {localStorage.getItem("nip")} </p>
          <Button onClick={() => logout()} className=" mt-2" variant="danger">
            Log Out
          </Button>
        </div>
        <Edit title="Edit Profile" />
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">NIP</th>
                <th scope="col">Status</th>
                <th scope="col">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {absensiList.map((absensi, i) => {
                const { users_nip, status, createdAt } = absensi;
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{users_nip}</td>
                    <td>{status}</td>
                    <td>{createdAt}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-center mx-2">
          <Badge
            pill
            bg="primary"
            style={{ cursor: "pointer" }}
            onClick={() => absen("checkin")}
          >
            CheckIn
          </Badge>
          <Badge
            pill
            bg="danger"
            style={{ cursor: "pointer" }}
            onClick={() => absen("checkout")}
          >
            CheckOut
          </Badge>
        </div>
      </main>
    </Container>
  );
}

export default Dashboard;
