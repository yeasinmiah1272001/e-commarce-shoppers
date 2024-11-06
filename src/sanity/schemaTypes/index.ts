import { type SchemaTypeDefinition } from "sanity";
import banner from "../schemas/banner";
import category from "./category";
import product from "./product";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [banner, product, category],
};
