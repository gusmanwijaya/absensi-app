/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";

export default function Navbar() {
  const router = useRouter();
  const [admin, setAdmin] = useState({
    _id: "",
    nama: "",
    username: "",
    role: "",
  });

  const [guru, setGuru] = useState({
    _id: "",
    nip: "",
    nama: "",
    jenisKelamin: "",
    agama: "",
    alamat: "",
    noHp: "",
    mataPelajaran: [],
    username: "",
    role: "",
  });

  const [siswa, setSiswa] = useState({
    _id: "",
    nisn: "",
    nama: "",
    jenisKelamin: "",
    agama: "",
    alamat: "",
    noHp: "",
    kelas: "",
    jurusan: "",
    mataPelajaran: [],
    username: "",
    role: "",
  });

  const [orangtua, setOrangTua] = useState({
    _id: "",
    nama: "",
    alamat: "",
    noHp: "",
    siswa: [],
    username: "",
    role: "",
  });

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const users = jwtDecode(token);
      if (users?.role === "admin") {
        setAdmin({
          ...admin,
          _id: users?._id,
          nama: users?.nama,
          username: users?.username,
          role: users?.role,
        });
      } else if (users?.role === "guru") {
        setGuru({
          ...guru,
          _id: users?._id,
          nip: users?.nip,
          nama: users?.nama,
          jenisKelamin: users?.jenisKelamin,
          agama: users?.agama,
          alamat: users?.alamat,
          noHp: users?.noHp,
          mataPelajaran: users?.mataPelajaran,
          username: users?.username,
          role: users?.role,
        });
      } else if (users?.role === "siswa") {
        setSiswa({
          ...siswa,
          _id: users?._id,
          nisn: users?.nisn,
          nama: users?.nama,
          jenisKelamin: users?.jenisKelamin,
          agama: users?.agama,
          alamat: users?.alamat,
          noHp: users?.noHp,
          kelas: users?.kelas,
          jurusan: users?.jurusan,
          mataPelajaran: users?.mataPelajaran,
          username: users?.username,
          role: users?.role,
        });
      } else if (users?.role === "orangtua") {
        setOrangTua({
          ...orangtua,
          _id: users?._id,
          nama: users?.nama,
          alamat: users?.alamat,
          noHp: users?.noHp,
          siswa: users?.siswa,
          username: users?.username,
          role: users?.role,
        });
      }
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.clear();
    sessionStorage.clear();
    router.push("/");
  };

  return (
    <div
      className="navbar text-gray-300 hover:text-white',
    'block px-3 py-2 text-base font-medium"
      style={{ backgroundColor: "#646FD4" }}
    >
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl hover:bg-transparent">
          Sistem Informasi Absensi
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link href="/dashboard">
              <button className="btn btn-ghost capitalize hover:bg-transparent">
                Dashboard
              </button>
            </Link>
          </li>
          <li tabIndex="0">
            <button className="btn btn-ghost capitalize hover:bg-transparent">
              Data Master
            </button>
            <ul className="p-2 bg-base-100 text-gray-600 z-20">
              <li>
                <Link href="/guru">
                  <button className="btn btn-ghost capitalize hover:bg-transparent">
                    Guru
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/jurusan">
                  <button className="btn btn-ghost capitalize hover:bg-transparent">
                    Jurusan
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/kelas">
                  <button className="btn btn-ghost capitalize hover:bg-transparent">
                    Kelas
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/mata-pelajaran">
                  <button className="btn btn-ghost capitalize hover:bg-transparent">
                    Mata Pelajaran
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/orang-tua">
                  <button className="btn btn-ghost capitalize hover:bg-transparent">
                    Orang Tua
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/siswa">
                  <button className="btn btn-ghost capitalize hover:bg-transparent">
                    Siswa
                  </button>
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link href="/absensi">
              <button className="btn hover:bg-transparent btn-ghost capitalize">
                Absensi
              </button>
            </Link>
          </li>

          <li>
            <button
              onClick={handleLogout}
              className="btn hover:bg-transparent btn-ghost capitalize"
            >
              Keluar
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
