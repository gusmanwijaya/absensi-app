import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import React from "react";
import Content from "../../components/Content";
import { getMataPelajaran, getAbsensiToday } from "../../services/absensi";
import Swal from "sweetalert2";

const AbsensiGuru = ({ mataPelajaran }) => {
  const router = useRouter();

  return (
    <Content title="Mata Kuliah Absensi">
      <div className="h-full overflow-y-auto">
        <div className="container px-6 mx-auto grid">
          <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
            {mataPelajaran.length > 0 &&
              mataPelajaran.map((value, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={async () => {
                    const response = await getAbsensiToday(value?._id);
                    if (response?.data?.data.length > 0) {
                      Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: `Anda sudah melakukan absensi untuk mata pelajaran ${value?.nama} hari ini!`,
                      });
                    } else {
                      router.push(`/absensi-guru/${value?._id}/absensi`);
                    }
                  }}
                >
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
                        {value?.nama}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
          </div>
        </div>
      </div>
    </Content>
  );
};

export default AbsensiGuru;

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
  if (user?.role !== "guru") {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  const response = await getMataPelajaran(token);

  return {
    props: {
      mataPelajaran: response?.data?.data || [],
    },
  };
}
