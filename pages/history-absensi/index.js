import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import React from "react";
import Content from "../../components/Content";
import { getMataPelajaran } from "../../services/absensi";

const HistoryAbsensi = ({ mataPelajaran }) => {
  const router = useRouter();

  return (
    <Content title="Mata Kuliah History Absensi">
      <div className="h-full overflow-y-auto">
        <div className="container px-6 mx-auto grid">
          <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
            {mataPelajaran.length > 0 &&
              mataPelajaran.map((value, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() =>
                    router.push(`/history-absensi/${value?._id}/pertemuan`)
                  }
                >
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
                    <div className="p-3 mr-4 text-emerald-500 bg-emtext-emerald-100 rounded-full">
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

export default HistoryAbsensi;

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
