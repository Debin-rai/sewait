import Hero from "@/components/home/Hero";
import ServicesGrid from "@/components/home/ServicesGrid";
import WidgetsGrid from "@/components/home/WidgetsGrid";
import NewsSection from "@/components/home/NewsSection";
import TasksSection from "@/components/home/TasksSection";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <div className="container mx-auto px-4 lg:px-10 py-16">
        <ServicesGrid />
        <WidgetsGrid />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-8">
          <NewsSection />
          <TasksSection />
        </div>
      </div>
    </div>
  );
}
