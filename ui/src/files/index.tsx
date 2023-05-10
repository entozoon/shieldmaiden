import useFetch from "react-fetch-hook";
import { Link } from "react-router-dom";
import { api } from "../data";
import { Logo, logoAnsi } from "./logo";
// https://developer.chrome.com/docs/devtools/console/format-style/
console.log(logoAnsi);
console.log("\n\n\n");
//
export const FilesIndex = () => {
  const filenames = useFetch(`${api}/getFilenames`).data as string[];
  //
  return (
    <>
      <header>
        <Logo />
        <h1>Data Files</h1>
      </header>
      <ul>
        {filenames?.map((f, i) => (
          <li key={`file-${i}`}>
            <Link to={`/file/${f}/`}>{f}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};
