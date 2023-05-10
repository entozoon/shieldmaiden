#! /usr/bin/env node
import { cwd } from "./util.cjs";
const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
const port = 1338;
if (cwd.includes("node_modules")) {
  throw new Error(
    "Use from project directory, not directly within node_modules"
  );
}
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(`${cwd}/cms`);
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
const app = express();
app.use(cors());
app.use(connectLivereload());
//
app.listen(port, () => console.log(`Listening on port ${port}`));
//
// Typical routes
app.get("/", (req: any, res: any) => {
  res.sendFile(`${cwd}/../cms/index.html`);
});
//
// API routes
app.use(express.static(`${cwd}/dist`));
// allow POST
app.use(express.json());
const router = express.Router();
//
const getFilenames = (req: any, res: any) => {
  const files = fs.readdirSync(cwd) || [];
  return res.json(
    files.filter(
      (file: string) =>
        file.endsWith(".json") &&
        !file.endsWith(".schema.json") &&
        // filter package.json and other typical baddies
        !["package.json", "package-lock.json"].includes(file)
    )
  );
};
const getFile = (req: any, res: any) => {
  const filename = req.params.filename;
  const buffer = fs.readFileSync(`${cwd}/${filename}`);
  const contents = JSON.parse(buffer.toString());
  return contents;
};
const getEntries = (req: any, res: any) => {
  const contents = getFile(req, res);
  return res.json(contents);
};
const getEntry = (req: any, res: any) => {
  const entries = getFile({ params: { filename: req.params.filename } }, res);
  const { index } = req.params;
  return res.json(entries[index]);
};
const getSchema = (req: any, res: any) => {
  const filename = req.params.filename.replace(/\.json$/, ".schema.json");
  const schema = getFile({ params: { filename } }, res);
  return res.json(schema);
};
const updateEntry = (req: any, res: any) => {
  const { filename, index } = req.params;
  const injection = req.body;
  // parse injection fields with schema
  const schema = getSchema({ params: { filename } }, res);
  // This is all nonsense but yeah, right idea.. use morning brain on it
  const updatedEntry = Object.keys(injection).reduce((acc, key) => {
    const field = schema.find((field: any) => field.key === key);
    if (field) {
      const { type } = field;
      if (type === "number") {
        acc[key] = Number(injection[key]);
      } else if (type === "boolean") {
        acc[key] = Boolean(injection[key]);
      } else {
        acc[key] = injection[key];
      }
    }
    return acc;
  }, {});
  console.log(":: ~ updatedEntry", updatedEntry);

  // const entries = getFile({ params: { filename } }, res);

  // entries[index] = updatedEntry;
  // fs.writeFileSync(
  //   `${cwd}/${filename}`,
  //   JSON.stringify(entries, null, 2),
  //   "utf8"
  // );
  // return res.json(updatedEntry);
  return res.json("okay");
};
app.use("/api", router);
router.get("/getFilenames", getFilenames);
router.get("/getEntries/:filename", getEntries);
router.get("/getEntry/:filename/:index", getEntry);
router.get("/getSchema/:filename", getSchema);
router.post("/updateEntry/:filename/:index", updateEntry);
// router.post("/posts", createPost);
// router.put("/posts/:id", updatePost);
// router.delete("/posts/:id", deletePost);
