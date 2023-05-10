export const api = "http://127.0.0.1:1338/api";
export interface SchemaProperty {
  name: string;
  type: string;
  description?: string;
}
export interface Schema {
  required?: string[];
  properties: SchemaProperty[];
  propertiesToList?: string[];
}
// SchemaProperty + value
export interface EntryField extends SchemaProperty {
  value?: any;
}
// export const parseSchema = (schema: any): Schema[] => {
//   if (!schema) return [];
//   return Object.keys(schema).map((key: string) => {
//     return {
//       name: key,
//       type: schema[key],
//     } as Schema;
//   });
// };
//
export const parseEntryToSchemaFields = (
  entry: any,
  schema: Schema
): EntryField[] => {
  if (!entry || !schema) {
    console.log("!! No entry / schema");
    return [];
  }
  const fields = Object.keys(schema.properties).map((key: string) => {
    const property = schema.properties[key as any];
    return {
      name: key,
      type: property.type,
      value: entry[key],
      description: property.description,
    };
  });
  return fields;
};
// export const parseSchemaFieldsToEntry = (fields: EntryField[]): any => {
//   console.log(":: ~ fields", fields);
//   if (!fields) return {};
//   const entry = fields.reduce((acc: any, field: EntryField) => {
//     acc[field.name] = field.value;
//     return acc;
//   }, {});
//   return entry;
// };
export const inputElementTypes = [
  "checkbox",
  "color",
  "date",
  "datetime-local",
  "email",
  // "file",
  "image",
  "month",
  "number",
  "password",
  "radio",
  "range",
  "reset",
  "search",
  "submit",
  "tel",
  "text",
  "time",
  "url",
  "week",
];
