import jwtDecode from "jwt-decode";
import Link from "next/link";
import React from "react";
import Content from "../../../components/Content";
import { getOne } from "../../../services/orang-tua";

const Detail = ({ oneData }) => {
  return (
    <Content title="Detail">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="flex flex-row items-center">
          <div className="px-8">
            <Link href="/orang-tua">
              <button type="button" className="flex">
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
                    d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                  />
                </svg>
              </button>
            </Link>
          </div>
          <div className="py-5">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Detail Data Orang Tua
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Tabel dibawah menampilkan detail dari data orang tua.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Nama</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {oneData?.nama}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Alamat</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {oneData?.alamat}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">No HP</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {oneData?.noHp}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Siswa</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="space-x-1 space-y-1">
                  {oneData?.siswa.length > 0 &&
                    oneData?.siswa.map((value, index) => (
                      <button
                        key={index}
                        className="btn btn-outline btn-xs capitalize hover:bg-transparent hover:text-gray-900"
                      >
                        {value?.nama}
                      </button>
                    ))}
                </div>
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Username</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {oneData?.username}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </Content>
  );
};

export default Detail;

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

  return {
    props: {
      oneData: response?.data?.data || {},
    },
  };
}
