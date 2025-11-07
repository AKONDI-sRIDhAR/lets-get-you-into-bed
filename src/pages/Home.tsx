import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import StarField from "@/components/StarField";
import ScrollReveal from "@/components/ScrollReveal";
import VariableProximity from "@/components/VariableProximity";
import { supabase } from "@/integrations/supabase/client";

interface Story {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

const Home = () => {
  const [latestStory, setLatestStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load the latest story from database
    const loadLatestStory = async () => {
      try {
        const { data, error } = await (supabase as any)
          .from('stories')
          .select('*')
          .order('date', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (error) {
          console.error("Error loading story:", error);
        } else if (data) {
          setLatestStory(data);
        }
      } catch (error) {
        console.error("Error loading story:", error);
      } finally {
        setLoading(false);
      }
    };

    loadLatestStory();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <StarField />
        <div className="relative z-10 text-center">
          <div className="animate-pulse text-primary text-2xl">Loading tonight's story...</div>
        </div>
      </div>
    );
  }

  if (!latestStory) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <StarField />
        <div className="relative z-10 text-center">
          <p className="text-xl text-muted-foreground">No stories yet — check back at bedtime 🌜</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative" ref={containerRef}>
      <StarField />
      
      <div className="relative z-10 container mx-auto px-6 py-16 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-up">
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-4 moon-text">
            🌙 <VariableProximity
              label="Let's Get You Into Bed"
              fromFontVariationSettings="'wght' 400"
              toFontVariationSettings="'wght' 700"
              containerRef={containerRef}
              radius={150}
              falloff="gaussian"
            />
          </h1>
          <p className="text-xl font-primary text-muted-foreground max-w-2xl mx-auto">
            Tonight's dreamy bedtime story
          </p>
        </div>

        {/* Story Content */}
        <article className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-12 animate-scale-in hover-lift">
          <header className="mb-8">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-foreground">
              {latestStory.title}
            </h2>
            <p className="text-lg font-primary text-primary font-medium">
              {new Date(latestStory.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </header>

          <div className="prose prose-lg dark:prose-invert prose-p:text-foreground/90 prose-p:leading-relaxed prose-headings:text-foreground max-w-none">
            {latestStory.content.split("\n\n").map((paragraph, index) => (
              <ScrollReveal
                key={index}
                containerClassName="mb-6"
                textClassName="text-lg font-primary leading-relaxed"
              >
                {paragraph}
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-12 pt-8 border-t border-primary/20">
            <div className="animate-fade-up">
              <p className="text-3xl font-heading font-bold text-primary mb-3">Good night</p>
              <p className="text-2xl font-primary text-foreground font-medium">Sweet dreams 🌙✨</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link to={`/stories/${latestStory.slug}`}>
              <Button variant="ghost" className="font-primary hover:bg-card/60">
                View full story →
              </Button>
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Home;
