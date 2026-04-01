import {defineType, defineField} from 'sanity'

export const introSection = defineType({
  name: 'introSection',
  title: 'Intro Section',
  type: 'document',
  fields: [
    defineField({
      name: 'page',
      title: 'Page',
      type: 'string',
      description: 'Select which page this intro section appears on',
      options: {
        list: [
          {title: 'Home Page', value: 'home'},
          {title: 'About Page', value: 'about'},
          {title: 'Projects Page', value: 'projects'},
          {title: 'Contact Page', value: 'contact'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Small label above the headline (e.g. "Software Architect & Curator")',
    }),
    defineField({
      name: 'headlineTop',
      title: 'Headline (Top Line)',
      type: 'string',
      description: 'First line of the main heading (e.g. "Building Scalable")',
    }),
    defineField({
      name: 'headlineAccent',
      title: 'Headline (Accent Line)',
      type: 'string',
      description: 'Italic accent line of the heading (e.g. "Digital Experiences")',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Short paragraph below the headline',
    }),
    defineField({
      name: 'ctaPrimary',
      title: 'Primary CTA',
      type: 'object',
      fields: [
        defineField({name: 'label', title: 'Label', type: 'string'}),
        defineField({name: 'href', title: 'Link', type: 'string'}),
      ],
    }),
    defineField({
      name: 'ctaSecondary',
      title: 'Secondary CTA',
      type: 'object',
      fields: [
        defineField({name: 'label', title: 'Label', type: 'string'}),
        defineField({name: 'href', title: 'Link', type: 'string'}),
      ],
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'chips',
      title: 'Floating Chips',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'icon', title: 'Material Icon Name', type: 'string'}),
            defineField({name: 'label', title: 'Label', type: 'string'}),
          ],
        },
      ],
      description: 'Spec chips displayed over the hero image (e.g. "Fullstack Engineering")',
    }),
  ],
  preview: {
    select: {
      title: 'headlineTop',
      subtitle: 'tagline',
      page: 'page',
    },
    prepare({title, subtitle, page}) {
      return {
        title: title || 'Untitled',
        subtitle: page ? `${page.charAt(0).toUpperCase() + page.slice(1)} • ${subtitle || ''}` : subtitle,
      }
    },
  },
})
