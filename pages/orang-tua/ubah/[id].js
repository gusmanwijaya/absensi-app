/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Content from "../../../components/Content";
import { MultiSelect } from "react-multi-select-component";
import { useRouter } from "next/router";
import { getForSelect, update, getOne } from "../../../services/orang-tua";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";

const Ubah = ({ dataSiswa, oneData, params }) => {
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
  });

  useEffect(() => {
    if (Object.keys(oneData).length > 0) {
      let _tempIdSiswa = [];

      let _idSiswa = [];
      oneData?.siswa.forEach((_idSis) => {
        _idSiswa.push(_idSis?._id);
      });

      if (_idSiswa.length > 0) {
        let updateForShowValueSiswa = [];
        optionsSiswa.forEach((element) => {
          _idSiswa.forEach((result) => {
            if (element?.value === result) {
              updateForShowValueSiswa.push({
                label: element?.label,
                value: element?.value,
              });
            }
          });
        });

        if (updateForShowValueSiswa.length > 0) {
          setShowValueSiswa(updateForShowValueSiswa);
          updateForShowValueSiswa.forEach((idSiswa) => {
            _tempIdSiswa.push(idSiswa?.value);
          });
        }
      }

      setForm({
        ...form,
        nama: oneData?.nama || "",
        alamat: oneData?.alamat || "",
        noHp: oneData?.noHp || "",
        siswa: JSON.stringify(_tempIdSiswa) || "",
        username: oneData?.username || "",
      });
    }
  }, []);

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
    const response = await update(params?.id, form);
    if (response?.data?.statusCode === 200) {
      router.push("/orang-tua");
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
            value={form?.username}
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

  const responseSiswa = await getForSelect(token);
  const responseOrangTua = await getOne(params?.id, token);

  return {
    props: {
      dataSiswa: responseSiswa?.data?.data || [],
      oneData: responseOrangTua?.data?.data || {},
      params,
    },
  };
}
