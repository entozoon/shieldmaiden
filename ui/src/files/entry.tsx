import { startCase } from "lodash";
import useFetch from "react-fetch-hook";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  api,
  inputElementTypes,
  parseEntryToSchemaFields,
  Schema,
} from "../data";
import { Logo } from "./logo";
//
export const Entry = ({
  filename,
  index,
}: {
  filename?: string;
  index?: string;
}) => {
  const { control, handleSubmit } = useForm();
  // filename = filename || useParams<{ filename: string }>().filename;
  // index = index || useParams<{ index: string }>().index;
  const schema = useFetch(`${api}/getSchema/${filename}`).data as Schema;
  const entry = useFetch(`${api}/getEntry/${filename}/${index}`).data as [];
  const entryFields = parseEntryToSchemaFields(entry, schema);
  if (!schema && !entryFields) {
    return <>Couldn't find schema or parse data against it</>;
  }
  const submit = async (values: FieldValues) => {
    console.log(":: ~ values", values);
    // Inject it like, correctly back into the entries array at the right index
    const result = await fetch(`${api}/updateEntry/${filename}/${index}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    console.log(":: ~ result", result);
  };
  return (
    <>
      <header>
        <Logo />
        <h1>
          <small>&gt;</small> {filename} <small>&gt;</small> {index}
        </h1>
      </header>
      <Link to={`/file/${filename}`} className="button -back">
        ← Back
      </Link>
      <form onSubmit={handleSubmit((_data) => submit(_data))}>
        <button type="submit">Save</button>
        {entryFields?.map(({ name, value, description, type }) => (
          <Controller
            name={name}
            key={name}
            control={control}
            defaultValue={value}
            render={({ field }) => (
              <section>
                <label>{startCase(name)}</label>
                {description && <p>{description}</p>}
                {inputElementTypes.includes(type) && (
                  <input {...field} type={type} />
                )}
                {["textarea"].includes(type) && <textarea {...field} />}
              </section>
            )}
          />
        ))}
        <button type="submit">Save</button>
      </form>
    </>
  );
};
