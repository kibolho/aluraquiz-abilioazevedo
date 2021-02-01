import NextImage from "next/image";
import { getBaseUrl } from "src/utils/provider";

function Image({ src }) {
  

  const thumbnail = `${getBaseUrl()}/api/screenshot.png?url=${encodeURIComponent(
    src
  )}`;
  return (
    <a href={src} style={{ display: "inline-block", fontSize: "0" }}>
      <NextImage width="1024" height="768" src={thumbnail} />
    </a>
  );
}
export default Image;
