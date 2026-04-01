import { defineField, defineType } from "sanity";

export default defineType({
  name: "professionalJourney",
  title: "Professional Journey",
  type: "document",
  fields: [
    defineField({
      name: "page",
      title: "Page",
      type: "string",
      options: {
        list: [
          { title: "Home Page", value: "home" },
          { title: "About Page", value: "about" },
          { title: "Projects Page", value: "projects" },
          { title: "Contact Page", value: "contact" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      initialValue: "Professional Journey",
    }),
    defineField({
      name: "experiences",
      title: "Work Experiences",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "period",
              title: "Time Period",
              type: "string",
              description: "e.g., 2022 — Present",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "position",
              title: "Job Position",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "company",
              title: "Company Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "location",
              title: "Location",
              type: "string",
              description: "e.g., Stockholm, SE or Remote",
            }),
          ],
          preview: {
            select: {
              period: "period",
              position: "position",
              company: "company",
            },
            prepare({ period, position, company }) {
              return {
                title: position,
                subtitle: `${company} • ${period}`,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      page: "page",
    },
    prepare({ title, page }) {
      const pageTitle =
        page === "home"
          ? "Home"
          : page === "about"
          ? "About"
          : page === "projects"
          ? "Projects"
          : "Contact";
      return {
        title: `${pageTitle} • ${title || "Professional Journey"}`,
      };
    },
  },
});
