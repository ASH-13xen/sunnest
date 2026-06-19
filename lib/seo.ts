const CONTROL_PANEL_API = process.env.NEXT_PUBLIC_SEO_API_URL || 'http://localhost:3000/api';
const SITE_ID = 'sunnest';

export interface SeoMetaData {
  title: string;
  description: string;
  canonicalUrl: string;
  robots: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogType: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  schemaMarkup: string | null;
  tracker: {
    googleAnalyticsId: string | null;
    metaPixelId: string | null;
    searchConsoleTag: string | null;
    headerScripts: string | null;
    footerScripts: string | null;
  } | null;
}

// Fetch dynamic metadata for a specific route path
export async function getSeoConfig(path: string): Promise<SeoMetaData | null> {
  try {
    const res = await fetch(`${CONTROL_PANEL_API}/seo-config?siteId=${SITE_ID}&path=${encodeURIComponent(path)}`, {
      next: { revalidate: 3600 }, // Cache on Next.js server for 1 hour
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error('Failed to fetch SEO configuration:', err);
    return null;
  }
}

// Fetch all published blogs
export async function getBlogs(page = 1, limit = 10) {
  try {
    const res = await fetch(`${CONTROL_PANEL_API}/blogs?siteId=${SITE_ID}&page=${page}&limit=${limit}&publishedOnly=true`, {
      next: { revalidate: 1800 }, // Cache list for 30 minutes
    });
    if (!res.ok) return { blogs: [], pagination: { total: 0, page, limit, totalPages: 0 } };
    return await res.json();
  } catch (err) {
    console.error('Failed to fetch blogs:', err);
    return { blogs: [], pagination: { total: 0, page, limit, totalPages: 0 } };
  }
}

// Fetch details for a specific blog post
export async function getBlogBySlug(slug: string) {
  try {
    const res = await fetch(`${CONTROL_PANEL_API}/blogs/${slug}?siteId=${SITE_ID}`, {
      next: { revalidate: 1800 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error(`Failed to fetch blog post details for slug: ${slug}`, err);
    return null;
  }
}

// Submit lead captures from user forms
export async function submitMarketingLead(formData: {
  formName?: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  metadata?: Record<string, any>;
}) {
  try {
    const res = await fetch(`${CONTROL_PANEL_API}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        siteId: SITE_ID,
        ...formData,
      }),
    });
    return res.ok;
  } catch (err) {
    console.error('Failed to submit marketing lead:', err);
    return false;
  }
}
