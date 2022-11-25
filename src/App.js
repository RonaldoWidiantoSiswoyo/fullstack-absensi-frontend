import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard/dashboard";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home title="Home Page" />} />
          <Route
            path="/login"
            element={
              <Login title="Login Page" description="Mini Absensi Apps" />
            }
          />
          <Route path="/dashboard" element={<Dashboard title="Dashboard" />} />
          <Route
            path="/register"
            element={
              <Register
                title="Register Page"
                description="mini register page"
              />
            }
          />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
