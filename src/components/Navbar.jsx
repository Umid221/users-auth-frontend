import { Link, useLocation, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("userAuthAccessToken");
    navigate("/login");
  }

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary sticky-top"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname.endsWith("signup") && "active"
                }`}
                aria-current="page"
                to={"signup"}
              >
                Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${pathname.endsWith("login") && "active"}`}
                to={"login"}
              >
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${pathname.endsWith("users") && "active"}`}
                to={"users"}
              >
                Users
              </Link>
            </li>
          </ul>
        </div>
        {/* <div> */}
        {isAuthenticated() && (
          <button onClick={logOut} className="btn btn-secondary">
            Log Out
          </button>
        )}
        {/* </div> */}
      </div>
    </nav>
  );
}

export default Navbar;
