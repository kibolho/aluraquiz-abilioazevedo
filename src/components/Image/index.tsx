import NextImage from "next/image";

function Image({ src }) {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://abilioazevedo.com.br";

  const thumbnail = `${baseUrl}/api/screenshot.png?url=${encodeURIComponent(
    src
  )}`;
  return (
    <a href={src} style={{ display: "inline-block", fontSize: "0" }}>
      <NextImage width="1024" height="768" src={thumbnail} />
    </a>
  );
}
export default Image;
