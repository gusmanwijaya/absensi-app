import React, { useState } from "react";
import Content from "../../components/Content";
import { MultiSelect } from "react-multi-select-component";
import { useRouter } from "next/router";
import { getForSelect, create } from "../../services/orang-tua";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";

const Tambah = ({ dataSiswa }) => {
  const router = useRouter();

  let _tempForOptionsSiswa = [];
  dataSiswa.forEach((element) => {
    _tempForOptionsSiswa.push({
      label: element?.nama,
      value: element?._id,
    });
  });
  const optionsSiswa = _tempForOptionsSiswa;

  const [showValueSiswa, setShowValueSiswa] = useState([]);

  const [form, setForm] = useState({
    nama: "",
    alamat: "",
    noHp: "",
    siswa: "",
    username: "",
    password: "",
  });

  const handleMultipleSelectSiswa = (data) => {
    setShowValueSiswa(data);
    let _tempSiswa = [];
    data.map((value, index) => {
      _tempSiswa.push(value?.value);
      if (_tempSiswa.length > 0) {
        setForm({ ...form, siswa: JSON.stringify(_tempSiswa) });
      }
    });
  };

  const handleSubmit = async () => {
    const response = await create(form);
    if (response?.data?.statusCode === 201) {
      router.push("/orang-tua");
      Swal.fire({
        icon: "success",
        title: "Sukses",
        text: `${response?.data?.message || "Berhasil menambahkan data!"}`,
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
    <Content title="Tambah">
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
          />
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <label
            htmlFor="alamat"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Alamat
          </label>
          <textarea
            name="alamat"
            className="textarea textarea-bordered w-full"
            onChange={(event) =>
              setForm({ ...form, alamat: event.target.value })
            }
          />
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <label
            htmlFor="noHp"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            No HP
          </label>
          <input
            type="text"
            name="noHp"
            className="input input-bordered w-full"
            required
            onChange={(event) => setForm({ ...form, noHp: event.target.value })}
          />
        </div>
        <div className="relative mb-6 w-full group">
          <label
            htmlFor="siswa"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Siswa
          </label>
          <MultiSelect
            options={optionsSiswa}
            value={showValueSiswa}
            onChange={(event) => handleMultipleSelectSiswa(event)}
            labelledBy="Pilih siswa"
          />
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            className="input input-bordered w-full"
            required
            onChange={(event) =>
              setForm({ ...form, username: event.target.value })
            }
          />
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            className="input input-bordered w-full"
            required
            onChange={(event) =>
              setForm({ ...form, password: event.target.value })
            }
          />
        </div>
        <div className="flex flex-row justify-between">
          <button
            onClick={() => router.push("/orang-tua")}
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
            Tambah
          </button>
        </div>
      </div>
    </Content>
  );
};

export default Tambah;

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

  const response = await getForSelect(token);

  return {
    props: {
      dataSiswa: response?.data?.data || [],
    },
  };
}
