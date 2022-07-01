import CallApi from "../../configs/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API = "api/v1";

export async function getDashboardAdmin(token) {
  const url = `${ROOT_API}/${API}/dashboard/get-dashboard-admin`;
  return CallApi({ url, method: "GET", serverToken: token });
}

export async function getDashboardGuru(token) {
  const url = `${ROOT_API}/${API}/dashboard/get-dashboard-guru`;
  return CallApi({ url, method: "GET", serverToken: token });
}

export async function getDashboardSiswa(token) {
  const url = `${ROOT_API}/${API}/dashboard/get-dashboard-siswa`;
  return CallApi({ url, method: "GET", serverToken: token });
}

export async function getDashboardOrangTua(token) {
  const url = `${ROOT_API}/${API}/dashboard/get-dashboard-orangtua`;
  return CallApi({ url, method: "GET", serverToken: token });
}
