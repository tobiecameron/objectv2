import { defineConfig } from "sanity"
import { deskTool } from "sanity/desk"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./schemas"

export default defineConfig({
  basePath: "/studio",
  projectId: "xji2nxsf",
  dataset: "production",
  title: "O B J E C T  V 2",
  schema: {
    types: schemaTypes,
  },
  plugins: [deskTool(), visionTool()],
})
