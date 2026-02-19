import Hero from "@/components/home/Hero";
import ServicesGrid from "@/components/home/ServicesGrid";
import WidgetsGrid from "@/components/home/WidgetsGrid";
import TasksSection from "@/components/home/TasksSection";
import AdSlot from "@/components/ads/AdSlot";
import PersonalReminders from "@/components/PersonalReminders";

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://sewait.up.railway.app/#website',
        'url': 'https://sewait.up.railway.app',
        'name': 'SewaIT',
        'alternateName': ['SewaIT', 'Sewa IT'],
        'description': 'Digital Utility Platform for Nepalis',
        'publisher': {
          '@id': 'https://sewait.up.railway.app/#organization'
        },
        'inLanguage': 'ne-NP'
      },
      {
        '@type': 'Organization',
        '@id': 'https://sewait.up.railway.app/#organization',
        'name': 'SewaIT',
        'url': 'https://sewait.up.railway.app',
        'logo': 'https://sewait.up.railway.app/web-app-manifest-512x512.png',
        'founder': {
          '@type': 'Person',
          '@id': 'https://sewait.up.railway.app/#founder',
          'name': 'Debin Rai',
          'url': 'https://sewait.up.railway.app/about'
        },
        'sameAs': [
          'https://facebook.com/SewaIT',
          'https://twitter.com/SewaIT'
        ]
      }
    ]
  };

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <div className="container mx-auto px-4 lg:px-10 py-16">
        <AdSlot position="HOME_HERO" className="mb-12 h-[200px] md:h-[400px]" />
        <ServicesGrid />
        <WidgetsGrid />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12 items-start">
          <TasksSection />
          <div className="lg:col-span-2">
            <PersonalReminders />
          </div>
        </div>
      </div>
    </div>
  );
}
