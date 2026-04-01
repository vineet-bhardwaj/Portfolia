import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'aboutMe',
  title: 'About Me Section',
  type: 'document',
  fields: [
    defineField({
      name: 'page',
      title: 'Page',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: 'About Page', value: 'about' },
        ],
      },
    }),
    defineField({
      name: 'label',
      title: 'Section Label',
      type: 'string',
      description: 'Small uppercase label above the title (e.g., "The Narrative")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'text',
      rows: 3,
      description: 'Main headline - use line breaks for formatting',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleAccent',
      title: 'Title Accent Word',
      type: 'string',
      description: 'Word to be italicized in the title (e.g., "experiences")',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Introductory paragraph about yourself',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'portrait',
      title: 'Portrait Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'page',
    },
    prepare({ title, page }) {
      return {
        title: title || 'About Me',
        subtitle: page ? `Page: ${page}` : 'No page selected',
      };
    },
  },
});
