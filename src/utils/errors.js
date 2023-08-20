import { toast } from "react-toastify";

export function showErrorMsg(err) {
  console.log(err);
  toast.error(err.response.data.message);
}
