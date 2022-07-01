import CallApi from "../../configs/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API = "api/v1";

export async function login(data, role = "admin") {
  const url = `${ROOT_API}/${API}/auth/login-${role}`;
  return CallApi({ url, method: "POST", data });
}

export async function ubahPassword(data, role = "admin", id) {
  const url = `${ROOT_API}/${API}/auth/ubah-password-${role}/${id}`;
  return CallApi({ url, method: "PUT", data, token: true });
}
