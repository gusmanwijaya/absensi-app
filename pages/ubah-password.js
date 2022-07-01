import React, { useState } from "react";
import Content from "../components/Content";
import { ubahPassword } from "../services/auth";
import Swal from "sweetalert2";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const UbahPassword = ({ users }) => {
  const router = useRouter();

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.clear();
    sessionStorage.clear();
    router.push("/");
  };

  const handleSubmit = async () => {
    const response = await ubahPassword(form, users?.role, users?._id);
    if (response?.data?.statusCode === 200) {
      handleLogout();
      Swal.fire({
        icon: "success",
        title: "Sukses",
        text: `${response?.data?.message || "Berhasil ubah password!"}`,
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
    <Content title="Ubah Password">
      <div className="max-w-2xl mx-auto">
        <div className="relative z-0 mb-6 w-full group">
          <label
            htmlFor="oldPassword"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Password lama
          </label>
          <input
            type="password"
            name="oldPassword"
            className="input input-bordered w-full"
            required
            onChange={(event) =>
              setForm({ ...form, oldPassword: event.target.value })
            }
          />
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Password baru
          </label>
          <input
            type="password"
            name="newPassword"
            className="input input-bordered w-full"
            required
            onChange={(event) =>
              setForm({ ...form, newPassword: event.target.value })
            }
          />
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <label
            htmlFor="confirmNewPassword"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Konfirmasi password baru
          </label>
          <input
            type="password"
            name="confirmNewPassword"
            className="input input-bordered w-full"
            required
            onChange={(event) =>
              setForm({ ...form, confirmNewPassword: event.target.value })
            }
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="btn btn-primary btn-sm capitalize"
        >
          Ubah
        </button>
      </div>
    </Content>
  );
};

export default UbahPassword;

export async function getServerSideProps({ req }) {
  const { token } = req.cookies;
  if (!token)
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };

  const users = jwtDecode(token);

  return {
    props: {
      users,
    },
  };
}
