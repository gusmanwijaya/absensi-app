/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Content from "../../../components/Content";
import { getSiswa, create } from "../../../services/absensi";
import moment from "moment";
import Swal from "sweetalert2";

const Absensi = ({ dataSiswa, params, users }) => {
  const router = useRouter();

  const [payload, setPayload] = useState({
    siswa: [],
    keterangan: [],
  });

  const [form, setForm] = useState({
    tanggal: `${moment().get("date")}-${
      moment().get("month") + 1
    }-${moment().get("year")}`,
    mataPelajaran: params?.id,
    siswa: "",
    guru: users?._id,
    keterangan: "",
  });

  useEffect(() => {
    if (payload.siswa.length > 0 && payload.keterangan.length > 0) {
      setForm({
        ...form,
        siswa: JSON.stringify(payload.siswa),
        keterangan: JSON.stringify(payload.keterangan),
      });
    }
  }, [payload.siswa, payload.keterangan]);

  const handleSimpan = async () => {
    if (form?.siswa !== "" && form?.keterangan !== "") {
      const response = await create(form);
      if (response?.data?.statusCode === 201) {
        Swal.fire({
          icon: "success",
          title: "Sukses",
          text: `${response?.data?.message || "Absen berhasil disimpan!"}`,
        });
        router.push("/absensi-guru");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${response?.data?.message || "Nampaknya terjadi kesalahan!"}`,
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Silahkan lengkapi absensi siswa`,
      });
    }
  };

  return (
    <Content title="Absensi">
      {dataSiswa.length > 0 ? (
        <div
          className={
            "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-xl bg-white"
          }
        >
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-row items-center">
              <h1>
                Tanggal :{" "}
                {`${moment().get("date")}-${
                  moment().get("month") + 1
                }-${moment().get("year")}`}
              </h1>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            {/* Projects table */}
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    }
                  >
                    NISN
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    }
                  >
                    Nama
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    }
                  >
                    Jenis Kelamin
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    }
                  >
                    Keterangan
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataSiswa.map((value, index) => (
                  <tr key={index}>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {value?.nisn}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {value?.nama}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {value?.jenisKelamin === "L" ? "Laki-laki" : "Perempuan"}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <div className="flex flex-row space-x-4">
                        <div className="form-control">
                          <label className="label cursor-pointer space-x-2">
                            <span className="label-text text-xs">Hadir</span>
                            <input
                              type="radio"
                              name={`keterangan-${index}`}
                              className="radio"
                              value="Hadir"
                              onChange={(event) => {
                                setPayload({
                                  ...payload,
                                  siswa: [...payload?.siswa, value?._id],
                                  keterangan: [
                                    ...payload?.keterangan,
                                    event.target.value,
                                  ],
                                });
                              }}
                            />
                          </label>
                        </div>
                        <div className="form-control">
                          <label className="label cursor-pointer space-x-2">
                            <span className="label-text text-xs">Izin</span>
                            <input
                              type="radio"
                              name={`keterangan-${index}`}
                              className="radio"
                              value="Izin"
                              onChange={(event) => {
                                setPayload({
                                  ...payload,
                                  siswa: [...payload?.siswa, value?._id],
                                  keterangan: [
                                    ...payload?.keterangan,
                                    event.target.value,
                                  ],
                                });
                              }}
                            />
                          </label>
                        </div>
                        <div className="form-control">
                          <label className="label cursor-pointer space-x-2">
                            <span className="label-text text-xs">Sakit</span>
                            <input
                              type="radio"
                              name={`keterangan-${index}`}
                              className="radio"
                              value="Sakit"
                              onChange={(event) => {
                                setPayload({
                                  ...payload,
                                  siswa: [...payload?.siswa, value?._id],
                                  keterangan: [
                                    ...payload?.keterangan,
                                    event.target.value,
                                  ],
                                });
                              }}
                            />
                          </label>
                        </div>
                        <div className="form-control">
                          <label className="label cursor-pointer space-x-2">
                            <span className="label-text text-xs">Alpa</span>
                            <input
                              type="radio"
                              name={`keterangan-${index}`}
                              className="radio"
                              value="Alpa"
                              onChange={(event) => {
                                setPayload({
                                  ...payload,
                                  siswa: [...payload?.siswa, value?._id],
                                  keterangan: [
                                    ...payload?.keterangan,
                                    event.target.value,
                                  ],
                                });
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-row justify-end px-10 py-4">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleSimpan}
            >
              Simpan
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center space-y-1">
          <img
            src="/img/empty.svg"
            alt="Empty"
            className="w-1/2 h-1/2 object-cover"
          />
          <p className="text-slate-500">Oops, nampaknya data masih kosong!</p>
        </div>
      )}
    </Content>
  );
};

export default Absensi;

export async function getServerSideProps({ req, params }) {
  const { token } = req.cookies;
  if (!token)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  const users = jwtDecode(token);
  if (users?.role !== "guru") {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  const response = await getSiswa(params?.id, token);

  return {
    props: {
      dataSiswa: response?.data?.data || [],
      params,
      users,
    },
  };
}
