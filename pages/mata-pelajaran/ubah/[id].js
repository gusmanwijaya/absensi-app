/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Content from "../../../components/Content";
import { useRouter } from "next/router";
import { update, getOne, getForSelect } from "../../../services/mata-pelajaran";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";
import { MultiSelect } from "react-multi-select-component";

const Ubah = ({ oneData, params, kelas, jurusan }) => {
  const router = useRouter();

  let _tempForOptionsKelas = [];
  kelas.forEach((element) => {
    _tempForOptionsKelas.push({
      label: element?.nama,
      value: element?._id,
    });
  });
  const optionsKelas = _tempForOptionsKelas;

  const [showValueKelas, setShowValueKelas] = useState([]);

  let _tempForOptionsJurusan = [];
  jurusan.forEach((element) => {
    _tempForOptionsJurusan.push({
      label: element?.nama,
      value: element?._id,
    });
  });
  const optionsJurusan = _tempForOptionsJurusan;

  const [showValueJurusan, setShowValueJurusan] = useState([]);

  const [form, setForm] = useState({
    kode: "",
    nama: "",
    sks: 0,
    kelas: "",
    jurusan: "",
  });

  useEffect(() => {
    if (Object.keys(oneData).length > 0) {
      let _tempIdKelas = [];

      let _idKelas = [];
      oneData?.kelas.forEach((_id) => {
        _idKelas.push(_id?._id);
      });

      if (_idKelas.length > 0) {
        let updateForShowValueKelas = [];
        optionsKelas.forEach((element) => {
          _idKelas.forEach((result) => {
            if (element?.value === result) {
              updateForShowValueKelas.push({
                label: element?.label,
                value: element?.value,
              });
            }
          });
        });

        if (updateForShowValueKelas.length > 0) {
          setShowValueKelas(updateForShowValueKelas);
          updateForShowValueKelas.forEach((idMapel) => {
            _tempIdKelas.push(idMapel?.value);
          });
        }
      }

      let _tempIdJurusan = [];

      let _idJurusan = [];
      oneData?.jurusan.forEach((_id) => {
        _idJurusan.push(_id?._id);
      });

      if (_idJurusan.length > 0) {
        let updateForShowValueJurusan = [];
        optionsJurusan.forEach((element) => {
          _idJurusan.forEach((result) => {
            if (element?.value === result) {
              updateForShowValueJurusan.push({
                label: element?.label,
                value: element?.value,
              });
            }
          });
        });

        if (updateForShowValueJurusan.length > 0) {
          setShowValueJurusan(updateForShowValueJurusan);
          updateForShowValueJurusan.forEach((idMapel) => {
            _tempIdJurusan.push(idMapel?.value);
          });
        }
      }

      setForm({
        ...form,
        kode: oneData?.kode || "",
        nama: oneData?.nama || "",
        sks: oneData?.sks || 0,
        kelas: JSON.stringify(_tempIdKelas) || "",
        jurusan: JSON.stringify(_tempIdJurusan) || "",
      });
    }
  }, []);

  const handleMultipleSelectKelas = (data) => {
    setShowValueKelas(data);
    let _tempKelas = [];
    data.map((value, index) => {
      _tempKelas.push(value?.value);
      if (_tempKelas.length > 0) {
        setForm({ ...form, kelas: JSON.stringify(_tempKelas) });
      }
    });
  };

  const handleMultipleSelectJurusan = (data) => {
    setShowValueJurusan(data);
    let _tempJurusan = [];
    data.map((value, index) => {
      _tempJurusan.push(value?.value);
      if (_tempJurusan.length > 0) {
        setForm({ ...form, jurusan: JSON.stringify(_tempJurusan) });
      }
    });
  };

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
        <div className="relative mb-6 w-full group">
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
        <div className="relative mb-6 w-full group">
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
        <div className="relative mb-6 w-full group">
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
        <div className="relative mb-6 w-full group">
          <label
            htmlFor="kelas"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Kelas
          </label>
          <MultiSelect
            options={optionsKelas}
            value={showValueKelas}
            onChange={(event) => handleMultipleSelectKelas(event)}
            labelledBy="Pilih kelas"
          />
        </div>
        <div className="relative mb-6 w-full group">
          <label
            htmlFor="jurusan"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Jurusan
          </label>
          <MultiSelect
            options={optionsJurusan}
            value={showValueJurusan}
            onChange={(event) => handleMultipleSelectJurusan(event)}
            labelledBy="Pilih jurusan"
          />
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
