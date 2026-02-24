import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 pb-16 lg:pb-0">
                {children}
            </main>
            <MobileBottomNav />
        </div>
    );
}
