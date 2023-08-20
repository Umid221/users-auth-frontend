import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAxios } from "../configs/axiosInstance";
import AuthContainer from "../common/AuthContainer";
import { showErrorMsg } from "../utils/errors";

function Signup() {
  const navigate = useNavigate();
  const httpRequest = useAxios();

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      name: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
    };

    httpRequest({
      method: "post",
      url: "/auth/signup",
      data,
    })
      .then((res) => {
        toast.success(res.data.message);
        navigate("/login");
      })
      .catch(showErrorMsg);
  }

  return (
    <AuthContainer cardTitle={"Sign Up"}>
      <form onSubmit={handleSubmit} className="row">
        <div className="col-md-12 my-1">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Name"
            required
          />
          {/* <div className="valid-feedback">Looks good!</div> */}
        </div>
        <div className="col-md-12 my-1">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            className="form-control"
            placeholder="Email"
            required
          />
        </div>
        <div className="col-md-12 mb-1">
          <label htmlFor="Password">Password</label>
          <input
            type={"password"}
            className="form-control"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100 my-3">
          Create Account
        </button>
      </form>
      <div className="text-center">
        <Link to={"/login"} className="text-secondary">
          Already have an account?
        </Link>
      </div>
    </AuthContainer>
  );
}

export default Signup;
