import Head from "next/head";

export default function Header({ title }) {
  return (
    <Head>
      <title>{title} - Sistem Informasi Presensi</title>
      <meta
        name="description"
        content="Developer: Gusman Wijaya, S.Kom (https://gusmanwijaya.com)"
      />
      <meta
        property="og:title"
        content="Developer: Gusman Wijaya, S.Kom (https://gusmanwijaya.com)"
      />
      <meta
        property="og:description"
        content="Developer: Gusman Wijaya, S.Kom (https://gusmanwijaya.com)"
      />
    </Head>
  );
}
