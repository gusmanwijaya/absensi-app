import CallApi from "../../configs/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API = "api/v1";

export async function getMataPelajaran(token) {
  const url = `${ROOT_API}/${API}/absensi/get-mata-pelajaran`;
  return CallApi({ url, method: "GET", serverToken: token });
}

export async function getSiswa(id, token) {
  const url = `${ROOT_API}/${API}/absensi/get-siswa/${id}`;
  return CallApi({ url, method: "GET", serverToken: token });
}

export async function getAbsensiToday(id) {
  const url = `${ROOT_API}/${API}/absensi/get-absensi-today/${id}`;
  return CallApi({ url, method: "GET", token: true });
}

export async function getPertemuan(id, token) {
  const url = `${ROOT_API}/${API}/absensi/get-pertemuan/${id}`;
  return CallApi({ url, method: "GET", serverToken: token });
}

export async function getAllAbsensi(id, query, token) {
  const url = `${ROOT_API}/${API}/absensi/get-all-absensi/${id}?query=${query}`;
  return CallApi({ url, method: "GET", serverToken: token });
}

export async function create(data) {
  const url = `${ROOT_API}/${API}/absensi/create`;
  return CallApi({ url, method: "POST", token: true, data });
}
