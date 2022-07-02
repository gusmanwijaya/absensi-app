import jwtDecode from "jwt-decode";
import React from "react";
import Content from "../../../components/Content";
import { QRCodeSVG } from "qrcode.react";
import moment from "moment";

const Absensi = ({ params }) => {
  const ROOT_API = process.env.NEXT_PUBLIC_API_IP;
  const API = "api/v1";

  const tanggal = `${moment().get("date")}-${
    moment().get("month") + 1
  }-${moment().get("year")}`;

  return (
    <Content title="Absensi">
      <div className="flex flex-col justify-center items-center my-24 space-y-10">
        <QRCodeSVG
          size={256}
          value={`${ROOT_API}/${API}/absensi/qr-code?tanggal=${tanggal}&mataPelajaran=${params?.id}`}
        />
        <p>Silahkan scan untuk melakukan absen!</p>
      </div>
    </Content>
  );
};

export default Absensi;

export async function getServerSideProps({ req, params }) {
  const { token } = req.cookies;
  if (!token)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  const users = jwtDecode(token);
  if (users?.role !== "siswa") {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {
      params,
    },
  };
}
