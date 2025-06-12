export const revalidate = 60 // Revalidate at most once per minute

import { getPost, getSiteSettings } from "@/lib/sanity"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PortableText } from "@portabletext/react"
import type { Metadata } from "next"

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug)
  const siteSettings = await getSiteSettings()

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  const siteTitle = siteSettings?.title || "O B J E C T"

  return {
    title: `${post.title} | ${siteTitle}`,
    description: post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      type: "article",
      publishedTime: post.publishedAt || undefined,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug)
  const siteSettings = await getSiteSettings()
  const contactEmail = siteSettings?.contactEmail || "hello@blokhouse.xyz"

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen p-8 bg-black">
      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="text-white hover:text-gray-300 transition-colors mb-8 inline-block">
          ← Back to Blog
        </Link>

        <article className="mt-8">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

          {post.publishedAt && (
            <p className="text-sm text-gray-400 mb-8">{new Date(post.publishedAt).toLocaleDateString()}</p>
          )}

          <div className="prose prose-invert max-w-none">{post.content && <PortableText value={post.content} />}</div>
        </article>

        {/* Email address at the bottom - use contactEmail from site settings */}
        <div className="text-center mt-12 pb-4 font-mono text-[0.85rem]" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
          <a href={`mailto:${contactEmail}`} style={{ color: "rgba(255, 255, 255, 0.5)", textDecoration: "none" }}>
            {contactEmail}
          </a>
        </div>
      </div>
    </main>
  )
}
