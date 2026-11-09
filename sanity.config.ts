import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";

/** Sanity Studio, served at /studio (decision 283). Site settings is a single document. */
export default defineConfig({
  name: "vanguard",
  title: "Vanguard Technology",
  basePath: "/studio",
  projectId: projectId || "not-configured",
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem().title("Site settings").id("siteSettings").child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.divider(),
            ...S.documentTypeListItems().filter((i) => i.getId() !== "siteSettings"),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
