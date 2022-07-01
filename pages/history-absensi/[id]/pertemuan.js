/* eslint-disable @next/next/no-img-element */
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import React from "react";
import Content from "../../../components/Content";
import { getPertemuan } from "../../../services/absensi";

const Pertemuan = ({ pertemuan, params }) => {
  const router = useRouter();

  return (
    <Content title="Pertemuan History Absensi">
      {pertemuan.length > 0 ? (
        <div className="h-full overflow-y-auto">
          <div className="container px-6 mx-auto grid">
            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
              {pertemuan.map((value, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() =>
                    router.push(
                      `/history-absensi/${params.id}/history?query=${value}`
                    )
                  }
                >
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
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col justify-start items-start">
                      <p className="mb-2 text-sm font-medium text-gray-600">
                        Pertemuan
                      </p>
                      <p className="text-lg font-semibold text-gray-700">
                        {value}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center space-y-1">
          <img
            src="/img/empty.svg"
            alt="Empty"
            className="w-1/2 h-1/2 object-cover"
          />
          <p className="text-slate-500">Oops, nampaknya data masih kosong!</p>
        </div>
      )}
    </Content>
  );
};

export default Pertemuan;

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
  if (user?.role !== "guru") {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  const response = await getPertemuan(params.id, token);

  return {
    props: {
      pertemuan: response?.data?.data || [],
      params,
    },
  };
}
