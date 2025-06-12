export default {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fieldsets: [
    {
      name: 'meta',
      title: 'Metadata',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    {
      name: "title",
      title: "Site Title",
      type: "string",
    },
    {
      name: "description",
      title: "Site Description",
      type: "text",
      description: "A brief description of the site for SEO and social sharing",
      rows: 3,
      fieldset: 'meta',
    },
    {
      name: "keywords",
      title: "Keywords",
      type: "string",
      description: "Comma-separated keywords for SEO",
      fieldset: 'meta',
    },
    {
      name: "ogTitle",
      title: "Open Graph Title",
      type: "string",
      description: "Title used for social sharing (og:title)",
      fieldset: "meta",
    },
    {
      name: "ogDescription",
      title: "Open Graph Description",
      type: "text",
      description: "Description used for social sharing (og:description)",
      fieldset: "meta",
      rows: 3,
    },
    {
      name: "twitterCardType",
      title: "Twitter Card Type",
      type: "string",
      description: "Card type for Twitter (e.g. summary, summary_large_image)",
      options: {
        list: [
          { title: "Summary", value: "summary" },
          { title: "Summary Large Image", value: "summary_large_image" },
          { title: "App", value: "app" },
          { title: "Player", value: "player" }
        ],
        layout: "radio"
      },
      fieldset: "meta",
    },
    {
      name: "robots",
      title: "Robots Meta Tag",
      type: "string",
      description: "e.g. index, follow or noindex, nofollow",
      fieldset: "meta",
    },
    {
      name: "logo",
      title: "Logo",
      type: "object",
      fields: [
        {
          name: "svgFile",
          title: "SVG Logo",
          type: "file",
          description: "Upload your SVG logo file",
          options: {
            accept: "image/svg+xml",
          },
        },
        {
          name: "width",
          title: "Width (px)",
          type: "number",
          validation: (Rule: any) => Rule.positive(),
          initialValue: 200,
        },
        {
          name: "height",
          title: "Height (px)",
          type: "number",
          validation: (Rule: any) => Rule.positive(),
          initialValue: 200,
        },
      ],
    },
    {
      name: "logoText",
      title: "Logo Text",
      type: "string",
      description: "Text to display below the logo",
    },
    {
      name: "favicon",
      title: "Favicon",
      type: "object",
      description: "Upload favicon files for the site",
      fields: [
        {
          name: "mainIcon",
          title: "Main Favicon",
          type: "image",
          description: "Upload a square image (at least 32x32px, preferably 512x512px)",
          options: {
            accept: "image/png,image/jpeg,image/svg+xml",
          },
        },
        {
          name: "appleTouchIcon",
          title: "Apple Touch Icon",
          type: "image",
          description: "Optional: Upload a square image for Apple devices (180x180px)",
          options: {
            accept: "image/png",
          },
        },
      ],
    },
    {
      name: "socialImage",
      title: "Default Social Image",
      type: "image",
      description: "Image used for social media sharing (recommended: 1200x630px)",
    },
    {
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      description: "Main contact email address",
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }: any) {
      return {
        title: title || "Site Settings",
      }
    },
  },
}
