import { Route, Routes, useLocation } from "react-router-dom";
import "./App.scss";
import { FilesIndex } from "./files";
import { Entries } from "./files/entries";
import { Entry } from "./files/entry";
//
export function App() {
  const location = useLocation();
  const { background, filename, index } = location?.state || {};
  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<FilesIndex />} />
        <Route
          path="/file/:filename"
          element={
            <div
              style={{
                display: index !== undefined ? "none" : "block",
              }}
            >
              <Entries />
            </div>
          }
        />
        {/* <Route path="/file/:filename/:index" element={<Entry />} /> */}
      </Routes>
      {filename && <Entry filename={filename} index={index} />}
    </>
  );
}
