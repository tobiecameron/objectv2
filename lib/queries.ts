// lib/queries.ts
import { groq } from 'next-sanity'

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  title,
  description,
  keywords,
  favicon,
  logo,
  socialImage,
  ogTitle,
  twitterCardType,
  robots
}`