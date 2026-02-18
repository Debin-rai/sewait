import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/sewait-portal-99/', '/api/admin/'],
        },
        sitemap: 'https://sewait.up.railway.app/sitemap.xml',
    }
}
