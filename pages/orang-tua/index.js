/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React from "react";
import Content from "../../components/Content";
import Pagination from "../../components/Pagination";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrangTua, setPage } from "../../redux/orang-tua/actions";
import Swal from "sweetalert2";
import { destroy } from "../../services/orang-tua";
import jwtDecode from "jwt-decode";

const OrangTua = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { allData, page, total_page } = useSelector(
    (state) => state.orangTuaReducers
  );

  const handlePrevious = () => {
    dispatch(setPage(page <= 1 ? 1 : page - 1));
  };

  const handleNext = () => {
    dispatch(setPage(page === total_page ? total_page : page + 1));
  };

  useEffect(() => {
    dispatch(fetchAllOrangTua());
  }, [dispatch, page]);

  const onDelete = (id) => {
    Swal.fire({
      title: "Hapus data?",
      text: "Data yang telah dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#9f1239",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Iya, Hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await destroy(id);
        if (response?.data?.statusCode === 200) {
          Swal.fire({
            icon: "success",
            title: "Sukses",
            text: `${response?.data?.message || "Berhasil menghapus data!"}`,
          });
          dispatch(fetchAllOrangTua());
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${
              response?.data?.message || "Nampaknya terjadi kesalahan!"
            }`,
          });
        }
      }
    });
  };

  return (
    <Content title="Orang Tua">
      {allData.length > 0 ? (
        <div
          className={
            "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-xl bg-white"
          }
        >
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-row items-center">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => router.push("/orang-tua/tambah")}
              >
                Tambah
              </button>
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
                    Nama
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    }
                  >
                    No HP
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    }
                  >
                    Username
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    }
                  ></th>
                </tr>
              </thead>
              <tbody>
                {allData.map((value, index) => (
                  <tr key={index}>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {value?.nama}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {value?.noHp}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {value?.username}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center space-x-1">
                      <button
                        className="btn btn-ghost btn-xs capitalize hover:bg-transparent"
                        onClick={() =>
                          router.push(`/orang-tua/detail/${value?._id}`)
                        }
                      >
                        Detail
                      </button>
                      <button
                        className="btn btn-ghost btn-xs capitalize text-orange-500 hover:bg-transparent"
                        onClick={() =>
                          router.push(`/orang-tua/ubah/${value?._id}`)
                        }
                      >
                        Ubah
                      </button>
                      <button
                        className="btn btn-ghost btn-xs capitalize text-red-500 hover:bg-transparent"
                        onClick={() => onDelete(value?._id)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-row justify-end px-4 py-4">
            <Pagination
              page={page}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
              disabledPrevious={page <= 1 ? true : false}
              disabledNext={page === total_page ? true : false}
            />
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

export default OrangTua;

export async function getServerSideProps({ req }) {
  const { token } = req.cookies;
  if (!token)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  const user = jwtDecode(token);
  if (user?.role !== "admin") {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
