/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Content from "../../../components/Content";
import { useRouter } from "next/router";
import { update, getOne, getForSelect } from "../../../services/mata-pelajaran";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";

const Ubah = ({ oneData, params, kelas, jurusan }) => {
  const router = useRouter();

  const [form, setForm] = useState({
    kode: "",
    nama: "",
    sks: 0,
    kelas: "",
    jurusan: "",
  });

  useEffect(() => {
    if (Object.keys(oneData).length > 0) {
      setForm({
        ...form,
        kode: oneData?.kode || "",
        nama: oneData?.nama || "",
        sks: oneData?.sks || 0,
        kelas: oneData?.kelas?.nama || "",
        jurusan: oneData?.jurusan?.nama || "",
      });
    }
  }, []);

  const handleSubmit = async () => {
    const response = await update(params?.id, form);
    if (response?.data?.statusCode === 200) {
      router.push("/mata-pelajaran");
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
            htmlFor="kode"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Kode
          </label>
          <input
            type="text"
            name="kode"
            className="input input-bordered w-full"
            required
            onChange={(event) => setForm({ ...form, kode: event.target.value })}
            value={form?.kode}
          />
        </div>
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
        <div className="relative z-0 mb-6 w-full group">
          <label
            htmlFor="sks"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            SKS
          </label>
          <input
            type="number"
            min={0}
            name="sks"
            className="input input-bordered w-full"
            required
            onChange={(event) => setForm({ ...form, sks: event.target.value })}
            value={form?.sks}
          />
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <label
            htmlFor="kelas"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Kelas
          </label>
          <select
            name="kelas"
            className="input input-bordered w-full"
            required
            onChange={(event) =>
              setForm({ ...form, kelas: event.target.value })
            }
          >
            <option value="">Pilih kelas</option>
            {kelas.length > 0 &&
              kelas.map((value, index) => (
                <option
                  key={index}
                  value={value?._id}
                  selected={oneData?.kelas?._id === value?._id ? true : false}
                >
                  {value?.nama}
                </option>
              ))}
          </select>
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <label
            htmlFor="jurusan"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Jurusan
          </label>
          <select
            name="jurusan"
            className="input input-bordered w-full"
            required
            onChange={(event) =>
              setForm({ ...form, jurusan: event.target.value })
            }
          >
            <option value="">Pilih jurusan</option>
            {jurusan.length > 0 &&
              jurusan.map((value, index) => (
                <option
                  key={index}
                  value={value?._id}
                  selected={oneData?.jurusan?._id === value?._id ? true : false}
                >
                  {value?.nama}
                </option>
              ))}
          </select>
        </div>
        <div className="flex flex-row justify-between">
          <button
            onClick={() => router.push("/mata-pelajaran")}
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
  const responseForSelect = await getForSelect(token);

  return {
    props: {
      oneData: response?.data?.data || {},
      kelas: responseForSelect?.data?.data?.kelas || [],
      jurusan: responseForSelect?.data?.data?.jurusan || [],
      params,
    },
  };
}
