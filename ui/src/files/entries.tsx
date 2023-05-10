import { startCase } from "lodash";
import useFetch from "react-fetch-hook";
import { Link, useLocation, useParams } from "react-router-dom";
import { api, Schema } from "../data";
import { Logo } from "./logo";
//
export const Entries = () => {
  const location = useLocation();
  const filename = useParams<{ filename: string }>().filename;
  const schema = useFetch(`${api}/getSchema/${filename}`).data as Schema;
  const entries = useFetch(`${api}/getEntries/${filename}`).data as [];
  const { propertiesToList } = schema || {};
  // console.log(":: ~ stuff", { entries, schema, propertiesToList });
  return (
    <>
      <header>
        <Logo />
        <h1>
          <small>&gt;</small> {filename}
        </h1>
      </header>
      <Link to={`/`} className="button -back">
        ← Back
      </Link>
      <main>
        <table>
          <thead>
            <tr>
              <th>#</th>
              {propertiesToList?.map((p) => (
                <th key={p}>{startCase(p)}</th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {entries?.map((entry, index) => (
              <tr key={`e-${index}`}>
                <td>{index}</td>
                {propertiesToList?.map((p) => (
                  <td key={p}>{entry[p]}</td>
                ))}
                <td>
                  <Link
                    to={`/file/${filename}/${index}`}
                    state={{ background: location, filename, index }}
                    className="button"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
};
