/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Content from "../../../components/Content";
import { MultiSelect } from "react-multi-select-component";
import { useRouter } from "next/router";
import { getForSelect, update, getOne } from "../../../services/siswa";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";

const Ubah = ({ kelas, jurusan, dataMataPelajaran, oneData, params }) => {
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
    nisn: "",
    nama: "",
    jenisKelamin: "",
    agama: "",
    alamat: "",
    noHp: "",
    kelas: "",
    jurusan: "",
    mataPelajaran: "",
    username: "",
  });

  useEffect(() => {
    if (Object.keys(oneData).length > 0) {
      let _tempIdMapel = [];

      let _idMataPelajaran = [];
      oneData?.mataPelajaran.forEach((_idMapel) => {
        _idMataPelajaran.push(_idMapel?._id);
      });

      if (_idMataPelajaran.length > 0) {
        let updateForShowValueMataPelajaran = [];
        optionsMataPelajaran.forEach((element) => {
          _idMataPelajaran.forEach((result) => {
            if (element?.value === result) {
              updateForShowValueMataPelajaran.push({
                label: element?.label,
                value: element?.value,
              });
            }
          });
        });

        if (updateForShowValueMataPelajaran.length > 0) {
          setShowValueMataPelajaran(updateForShowValueMataPelajaran);
          updateForShowValueMataPelajaran.forEach((idMapel) => {
            _tempIdMapel.push(idMapel?.value);
          });
        }
      }

      setForm({
        ...form,
        nisn: oneData?.nisn || "",
        nama: oneData?.nama || "",
        jenisKelamin: oneData?.jenisKelamin || "",
        agama: oneData?.agama || "",
        alamat: oneData?.alamat || "",
        noHp: oneData?.noHp || "",
        kelas: oneData?.kelas?._id || "",
        jurusan: oneData?.jurusan?._id || "",
        mataPelajaran: JSON.stringify(_tempIdMapel) || "",
        username: oneData?.username || "",
      });
    }
  }, []);

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
    const response = await update(params?.id, form);
    if (response?.data?.statusCode === 200) {
      router.push("/siswa");
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
            htmlFor="nisn"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            NISN
          </label>
          <input
            type="text"
            name="nisn"
            className="input input-bordered w-full"
            required
            onChange={(event) => setForm({ ...form, nisn: event.target.value })}
            value={form?.nisn}
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
            htmlFor="jenisKelamin"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Jenis Kelamin
          </label>
          <select
            type="text"
            name="jenisKelamin"
            className="input input-bordered w-full"
            required
            onChange={(event) =>
              setForm({ ...form, jenisKelamin: event.target.value })
            }
          >
            <option value="">Pilih jenis kelamin</option>
            <option
              value="L"
              selected={oneData?.jenisKelamin === "L" ? true : false}
            >
              Laki-laki
            </option>
            <option
              value="P"
              selected={oneData?.jenisKelamin === "P" ? true : false}
            >
              Perempuan
            </option>
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
            value={form?.agama}
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
            value={form?.alamat}
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
            value={form?.noHp}
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
            type="text"
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
            type="text"
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
            value={form?.username}
          />
        </div>
        <div className="flex flex-row justify-between">
          <button
            onClick={() => router.push("/siswa")}
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

  const responseOneData = await getOne(params?.id, token);
  const response = await getForSelect(token);

  return {
    props: {
      oneData: responseOneData?.data?.data || {},
      params,
      kelas: response?.data?.data?.kelas || [],
      jurusan: response?.data?.data?.jurusan || [],
      dataMataPelajaran: response?.data?.data?.mataPelajaran || [],
    },
  };
}
