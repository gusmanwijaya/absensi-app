import React, { useState } from "react";
import Content from "../../components/Content";
import { MultiSelect } from "react-multi-select-component";
import { useRouter } from "next/router";
import { getForSelectMataPelajaran, create } from "../../services/guru";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";

const Tambah = ({ dataMataPelajaran }) => {
  const router = useRouter();

  let _tempForOptionsMataPelajaran = [];
  dataMataPelajaran.forEach((element) => {
    _tempForOptionsMataPelajaran.push({
      label: element?.nama,
      value: element?._id,
    });
  });
  const optionsMataPelajaran = _tempForOptionsMataPelajaran;

  const [showValueMataPelajaran, setShowValueMataPelajaran] = useState([]);

  const [form, setForm] = useState({
    nip: "",
    nama: "",
    jenisKelamin: "",
    agama: "",
    alamat: "",
    noHp: "",
    mataPelajaran: "",
    username: "",
    password: "",
  });

  const handleMultipleSelectMataPelajaran = (data) => {
    setShowValueMataPelajaran(data);
    let _tempMataPelajaran = [];
    data.map((value, index) => {
      _tempMataPelajaran.push(value?.value);
      if (_tempMataPelajaran.length > 0) {
        setForm({ ...form, mataPelajaran: JSON.stringify(_tempMataPelajaran) });
      }
    });
  };

  const handleSubmit = async () => {
    const response = await create(form);
    if (response?.data?.statusCode === 201) {
      router.push("/guru");
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
            htmlFor="nip"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            NIP
          </label>
          <input
            type="text"
            name="nip"
            className="input input-bordered w-full"
            required
            onChange={(event) => setForm({ ...form, nip: event.target.value })}
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
          />
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <label
            htmlFor="jenisKelamin"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Jenis Kelamin
          </label>
          <select
            type="text"
            name="nama"
            className="input input-bordered w-full"
            required
            onChange={(event) =>
              setForm({ ...form, jenisKelamin: event.target.value })
            }
          >
            <option value="">Pilih jenis kelamin</option>
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </select>
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <label
            htmlFor="agama"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Agama
          </label>
          <input
            type="text"
            name="agama"
            className="input input-bordered w-full"
            required
            onChange={(event) =>
              setForm({ ...form, agama: event.target.value })
            }
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
            htmlFor="mataPelajaran"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Mata Pelajaran
          </label>
          <MultiSelect
            options={optionsMataPelajaran}
            value={showValueMataPelajaran}
            onChange={(event) => handleMultipleSelectMataPelajaran(event)}
            labelledBy="Pilih mata pelajaran"
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
            onClick={() => router.push("/guru")}
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

  const response = await getForSelectMataPelajaran(token);

  return {
    props: {
      dataMataPelajaran: response?.data?.data || [],
    },
  };
}
