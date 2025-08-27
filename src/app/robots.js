export default function robots() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vrholding.ge';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/private/', '/admin/'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
