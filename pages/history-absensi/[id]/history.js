/* eslint-disable @next/next/no-img-element */
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import React from "react";
import Content from "../../../components/Content";
import { getAllAbsensi } from "../../../services/absensi";

const History = ({ dataAbsensi, query }) => {
  const router = useRouter();

  return (
    <Content title="History">
      {dataAbsensi.length > 0 ? (
        <div
          className={
            "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-xl bg-white"
          }
        >
          <div className="flex flex-row justify-start px-4 py-4">
            <button
              type="button"
              className="btn btn-ghost btn-xs hover:bg-transparent capitalize"
              onClick={() => router.back()}
            >
              Kembali
            </button>
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
                    Tanggal
                  </th>
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
                {dataAbsensi.map((value, index) => (
                  <tr key={index}>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {value?.tanggal}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {value?.siswa?.nisn}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {value?.siswa?.nama}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {value?.siswa?.jenisKelamin === "L"
                        ? "Laki-laki"
                        : "Perempuan"}
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
                              checked={
                                value?.keterangan === "Hadir" ? true : false
                              }
                              disabled
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
                              checked={
                                value?.keterangan === "Izin" ? true : false
                              }
                              disabled
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
                              checked={
                                value?.keterangan === "Sakit" ? true : false
                              }
                              disabled
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
                              checked={
                                value?.keterangan === "Alpa" ? true : false
                              }
                              disabled
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

export default History;

export async function getServerSideProps({ req, query }) {
  const { token } = req.cookies;
  if (!token)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  const user = jwtDecode(token);
  if (user?.role !== "guru") {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  const response = await getAllAbsensi(query.id, parseInt(query.query), token);

  return {
    props: {
      dataAbsensi: response?.data?.data || [],
      query,
    },
  };
}
