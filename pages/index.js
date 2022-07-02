/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useState } from "react";
import Header from "../components/Header";
import { login } from "../services/auth";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const SignIn = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "",
  });

  const handleSubmit = async () => {
    if (form?.role !== "") {
      const response = await login(form, form?.role);
      if (response?.data?.statusCode === 200) {
        Cookies.set("token", response?.data?.data?.token);
        router.push("/dashboard");
        Swal.fire({
          icon: "success",
          title: "Sukses",
          text: `${response?.data?.message || "Berhasil login!"}`,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${response?.data?.message || "Nampaknya terjadi kesalahan!"}`,
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Silahkan pilih masuk sebagai siapa`,
      });
    }
  };

  return (
    <>
      <Header title="Masuk" />
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sistem Informasi Presensi
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              <a className="font-medium text-indigo-600 hover:text-indigo-500">
                {" "}
                Silahkan masukkan username dan password{" "}
              </a>
            </p>
          </div>
          <div className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  onChange={(event) =>
                    setForm({ ...form, username: event.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  autoComplete="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={(event) =>
                    setForm({ ...form, password: event.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="role" className="sr-only">
                  Masuk sebagai
                </label>
                <select
                  onChange={(event) =>
                    setForm({ ...form, role: event.target.value })
                  }
                  name="role"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                >
                  <option value="">Masuk sebagai</option>
                  <option value="admin">Admin</option>
                  <option value="guru">Guru</option>
                  <option value="siswa">Siswa</option>
                  <option value="orangtua">Orang Tua</option>
                </select>
              </div>
            </div>

            <div>
              <button
                onClick={handleSubmit}
                type="button"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Masuk
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;

export async function getServerSideProps({ req }) {
  const { token } = req.cookies;
  if (token)
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };

  return {
    props: {},
  };
}
