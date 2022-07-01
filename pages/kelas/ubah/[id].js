/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Content from "../../../components/Content";
import { useRouter } from "next/router";
import { update, getOne } from "../../../services/kelas";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";

const Ubah = ({ oneData, params }) => {
  const router = useRouter();

  const [form, setForm] = useState({
    nama: "",
  });

  useEffect(() => {
    if (Object.keys(oneData).length > 0) {
      setForm({
        ...form,
        nama: oneData?.nama || "",
      });
    }
  }, []);

  const handleSubmit = async () => {
    const response = await update(params?.id, form);
    if (response?.data?.statusCode === 200) {
      router.push("/kelas");
      Swal.fire({
        icon: "success",
        title: "Sukses",
        text: `${response?.data?.message || "Berhasil mengubah data!"}`,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${response?.data?.message || "Nampaknya terjadi kesalahan!"}`,
      });
    }
  };

  return (
    <Content title="Ubah">
      <div className="max-w-2xl mx-auto">
        <div className="relative z-0 mb-6 w-full group">
          <label
            htmlFor="nama"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Nama
          </label>
          <input
            type="text"
            name="nama"
            className="input input-bordered w-full"
            required
            onChange={(event) => setForm({ ...form, nama: event.target.value })}
            value={form?.nama}
          />
        </div>
        <div className="flex flex-row justify-between">
          <button
            onClick={() => router.push("/kelas")}
            type="button"
            className="btn btn-ghost btn-sm hover:bg-transparent capitalize"
          >
            Kembali
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-primary btn-sm capitalize"
          >
            Ubah
          </button>
        </div>
      </div>
    </Content>
  );
};

export default Ubah;

export async function getServerSideProps({ req, params }) {
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

  const response = await getOne(params?.id, token);

  return {
    props: {
      oneData: response?.data?.data || {},
      params,
    },
  };
}
