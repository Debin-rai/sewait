import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Calendar, FileText, Tag } from "lucide-react";
import ReactMarkdown from "react-markdown";

// Since we are using Next.js 15, we need to handle async params correctly
export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const guide = await prisma.guide.findUnique({
        where: { slug: slug },
    });

    if (!guide) {
        return (
            <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold text-slate-800 mb-4">Guide Not Found</h1>
                <p className="text-slate-500 mb-8">The guide you are looking for does not exist.</p>
                <Link href="/" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors">
                    Go Home
                </Link>
            </div>
        );
    }

    // Fallback content if none provided (for demo/testing)
    const content = guide.content || `
# ${guide.title}

Information regarding ${guide.title} will be available here soon.

### Requirements
- Citizenship Copy
- Passport Size Photo
- Application Form

Please visit the nearest office for more details.
  `;

    return (
        <div className="min-h-screen bg-slate-50 pt-8 pb-12">
            {/* Placeholder Header/Nav is handled by layout */}

            <main className="container mx-auto px-4 lg:px-10 max-w-4xl">
                <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold mb-6 hover:underline">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>

                <article className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="bg-primary p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4 text-white/80 text-sm">
                                <span className="flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full">
                                    <Tag className="w-3 h-3" /> {guide.category}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="w-3 h-3" /> {new Date(guide.updatedAt).toLocaleDateString()}
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold mb-2 font-nepali leading-tight">
                                {guide.title}
                            </h1>
                        </div>
                    </div>

                    <div className="p-8 md:p-12 prose prose-slate max-w-none prose-headings:font-nepali prose-headings:text-primary">
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </div>
                </article>
            </main>
        </div>
    );
}
