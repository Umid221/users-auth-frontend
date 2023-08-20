import axios from "axios";
import { useNavigate } from "react-router-dom";
import { showErrorMsg } from "../utils/errors";

export const baseUrl = "http://localhost:8082";

function httpRequest(navigate) {
  const accessToken = localStorage.getItem("userAuthAccessToken");

  return async ({ method = "get", url, params, data }) => {
    return axios({
      method,
      url: baseUrl + url,
      params,
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      timeout: 10000,
    }).catch((err) => {
      if (err.response.status === 403) {
        localStorage.removeItem("userAuthAccessToken");
        navigate("/login");
      }
      showErrorMsg(err);
    });
  };
}

export function useAxios() {
  const navigate = useNavigate();
  return httpRequest(navigate);
}
