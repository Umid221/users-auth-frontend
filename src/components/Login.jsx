import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContainer from "../common/AuthContainer";
import { useAxios } from "../configs/axiosInstance";

function Login() {
  const navigate = useNavigate();
  const httpRequest = useAxios();

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      email: e.target[0].value,
      password: e.target[1].value,
    };

    httpRequest({
      method: "post",
      url: "/auth/login",
      data,
    }).then((res) => {
      localStorage.setItem("userAuthAccessToken", res.data.accessToken);
      toast.success(res.data.message);
      navigate("/users");
    });
  }

  return (
    <AuthContainer cardTitle={"Login"}>
      <form onSubmit={handleSubmit} className="row">
        <div className="col-md-12 my-3">
          <label htmlFor="email">Email</label>
          <input type="text" className="form-control" id="email" required />
        </div>
        <div className="col-md-12 mb-1">
          <label htmlFor="password">Password</label>
          <input
            type={"password"}
            id={"password"}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100 my-3">
          Login
        </button>
      </form>
      <div className="text-center">
        <Link to={"/signup"} className="text-secondary ">
          Don&apos;t have an account?
        </Link>
      </div>
    </AuthContainer>
  );
}

export default Login;
