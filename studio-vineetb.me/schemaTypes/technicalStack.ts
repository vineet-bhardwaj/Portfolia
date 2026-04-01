import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'technicalStack',
  title: 'Technical Stack',
  type: 'document',
  fields: [
    defineField({
      name: 'page',
      title: 'Page',
      type: 'string',
      description: 'Which page should this technical stack appear on?',
      options: {
        list: [
          { title: 'Home Page', value: 'home' },
          { title: 'About Page', value: 'about' },
          { title: 'Projects Page', value: 'projects' },
          { title: 'Contact Page', value: 'contact' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'e.g., "The Technical Stack"',
      initialValue: 'The Technical Stack',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      description: 'Optional subtitle description',
    }),
    defineField({
      name: 'categories',
      title: 'Skill Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Material Symbols icon name (e.g., "brush", "database", "terminal")',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Category Title',
              type: 'string',
              description: 'e.g., "Frontend", "Backend", "Tools & Infrastructure"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'skills',
              title: 'Skills',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'List of technologies/tools in this category',
              validation: (Rule) => Rule.required().min(1),
            }),
            defineField({
              name: 'bgStyle',
              title: 'Background Style',
              type: 'string',
              description: 'Visual style for this category card',
              options: {
                list: [
                  { title: 'Light', value: 'light' },
                  { title: 'Medium', value: 'medium' },
                  { title: 'High', value: 'high' },
                ],
              },
              initialValue: 'light',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              icon: 'icon',
              skillCount: 'skills.length',
            },
            prepare(selection) {
              const { title, icon, skillCount } = selection
              return {
                title: title,
                subtitle: `${icon} • ${skillCount || 0} skills`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      page: 'page',
      categoryCount: 'categories.length',
    },
    prepare(selection) {
      const { title, page, categoryCount } = selection
      const pageNames: Record<string, string> = {
        home: 'Home',
        about: 'About',
        projects: 'Projects',
        contact: 'Contact',
      }
      return {
        title: title || 'Technical Stack',
        subtitle: `${pageNames[page as string] || page} • ${categoryCount || 0} categories`,
      }
    },
  },
})
