import jwtDecode from "jwt-decode";
import React from "react";
import Content from "../components/Content";
import {
  getDashboardAdmin,
  getDashboardGuru,
  getDashboardSiswa,
  getDashboardOrangTua,
} from "../services/dashboard";

const Dashboard = ({ users, dataDashboard }) => {
  return (
    <Content title="Dashboard">
      <div className="h-full overflow-y-auto">
        <div className="container px-6 mx-auto grid">
          <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
            {users?.role === "admin" && (
              <>
                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
                  <div className="p-3 mr-4 text-cyan-500 bg-cyan-100 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-600">
                      Guru
                    </p>
                    <p className="text-lg font-semibold text-gray-700">
                      {dataDashboard?.guru}
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
                  <div className="p-3 mr-4 text-lime-500 bg-lime-100 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-600">
                      Jurusan
                    </p>
                    <p className="text-lg font-semibold text-gray-700">
                      {dataDashboard?.jurusan}
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
                  <div className="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-600">
                      Kelas
                    </p>
                    <p className="text-lg font-semibold text-gray-700">
                      {dataDashboard?.kelas}
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
                  <div className="p-3 mr-4 text-violet-500 bg-violet-100 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-600">
                      Mata Pelajaran
                    </p>
                    <p className="text-lg font-semibold text-gray-700">
                      {dataDashboard?.mataPelajaran}
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
                  <div className="p-3 mr-4 text-fuchsia-500 bg-fuchsia-100 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-600">
                      Orang Tua
                    </p>
                    <p className="text-lg font-semibold text-gray-700">
                      {dataDashboard?.orangTua}
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
                  <div className="p-3 mr-4 text-pink-500 bg-pink-100 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-600">
                      Siswa
                    </p>
                    <p className="text-lg font-semibold text-gray-700">
                      {dataDashboard?.siswa}
                    </p>
                  </div>
                </div>
              </>
            )}

            {users?.role === "guru" && (
              <>
                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
                  <div className="p-3 mr-4 text-violet-500 bg-violet-100 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-600">
                      Mata Pelajaran
                    </p>
                    <p className="text-lg font-semibold text-gray-700">
                      {dataDashboard?.mataPelajaran}
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
                  <div className="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-600">
                      Presensi
                    </p>
                    <p className="text-lg font-semibold text-gray-700">
                      {dataDashboard?.absensi}
                    </p>
                  </div>
                </div>
              </>
            )}

            {users?.role === "siswa" && (
              <>
                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
                  <div className="p-3 mr-4 text-rose-500 bg-rose-100 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-600">
                      Alpa
                    </p>
                    <p className="text-lg font-semibold text-gray-700">
                      {dataDashboard?.alpa}
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
                  <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-600">
                      Izin
                    </p>
                    <p className="text-lg font-semibold text-gray-700">
                      {dataDashboard?.izin}
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
                  <div className="p-3 mr-4 text-sky-500 bg-sky-100 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-600">
                      Sakit
                    </p>
                    <p className="text-lg font-semibold text-gray-700">
                      {dataDashboard?.sakit}
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
                  <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-600">
                      Hadir
                    </p>
                    <p className="text-lg font-semibold text-gray-700">
                      {dataDashboard?.hadir}
                    </p>
                  </div>
                </div>
              </>
            )}

            {users?.role === "orangtua" && (
              <>
                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
                  <div className="p-3 mr-4 text-violet-500 bg-violet-100 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-600">
                      Siswa
                    </p>
                    <p className="text-lg font-semibold text-gray-700">
                      {dataDashboard?.siswa}
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
                  <div className="p-3 mr-4 text-rose-500 bg-rose-100 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-600">
                      Alpa
                    </p>
                    <p className="text-lg font-semibold text-gray-700">
                      {dataDashboard?.alpa}
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
                  <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-600">
                      Izin
                    </p>
                    <p className="text-lg font-semibold text-gray-700">
                      {dataDashboard?.izin}
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
                  <div className="p-3 mr-4 text-sky-500 bg-sky-100 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-600">
                      Sakit
                    </p>
                    <p className="text-lg font-semibold text-gray-700">
                      {dataDashboard?.sakit}
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
                  <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-600">
                      Hadir
                    </p>
                    <p className="text-lg font-semibold text-gray-700">
                      {dataDashboard?.hadir}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {users?.role === "siswa" && dataDashboard?.history.length > 0 && (
            <div
              className={
                "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-xl bg-white"
              }
            >
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-row">
                  <h1>History Presensi</h1>
                </div>
              </div>
              <div className="block w-full overflow-x-auto">
                {/* Projects table */}
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                      >
                        Tanggal
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                      >
                        Pertemuan
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                      >
                        Mata Pelajaran
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                      >
                        Keterangan
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataDashboard?.history.map((value, index) => (
                      <tr key={index}>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {value?.tanggal}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {value?.pertemuan}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {`${value?.mataPelajaran?.kode} - ${value?.mataPelajaran?.nama}`}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {value?.keterangan}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {users?.role === "orangtua" && dataDashboard?.absensi.length > 0 && (
            <div
              className={
                "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-xl bg-white"
              }
            >
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-row">
                  <h1>History Presensi Siswa</h1>
                </div>
              </div>
              <div className="block w-full overflow-x-auto">
                {/* Projects table */}
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                      >
                        Tanggal
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                      >
                        Pertemuan
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                      >
                        Mata Pelajaran
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                      >
                        Siswa
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                      >
                        Keterangan
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataDashboard?.absensi.map((value, index) => (
                      <tr key={index}>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {value?.tanggal}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {value?.pertemuan}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {`${value?.mataPelajaran?.kode} - ${value?.mataPelajaran?.nama}`}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {`${value?.siswa?.nisn} - ${value?.siswa?.nama}`}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {value?.keterangan}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </Content>
  );
};

export default Dashboard;

export async function getServerSideProps({ req }) {
  const { token } = req.cookies;
  if (!token)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  const users = jwtDecode(token);
  let dataDashboard;

  if (users?.role === "admin") {
    const response = await getDashboardAdmin(token);
    dataDashboard = response?.data?.data;
  } else if (users?.role === "guru") {
    const response = await getDashboardGuru(token);
    dataDashboard = response?.data?.data;
  } else if (users?.role === "siswa") {
    const response = await getDashboardSiswa(token);
    dataDashboard = response?.data?.data;
  } else if (users?.role === "orangtua") {
    const response = await getDashboardOrangTua(token);
    dataDashboard = response?.data?.data;
  }

  return {
    props: {
      users,
      dataDashboard,
    },
  };
}
