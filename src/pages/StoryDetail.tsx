import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import StarField from "@/components/StarField";
import { supabase } from "@/integrations/supabase/client";

interface Story {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

const StoryDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStory = async () => {
      try {
        const { data, error } = await supabase
          .from('stories')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        if (error) {
          console.error("Error loading story:", error);
        }
        
        setStory(data);
      } catch (error) {
        console.error("Error loading story:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadStory();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <StarField />
        <div className="relative z-10 text-center">
          <div className="animate-pulse text-primary text-2xl">Loading story...</div>
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <StarField />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Story Not Found</h1>
          <p className="text-muted-foreground mb-8">This bedtime tale seems to have drifted away...</p>
          <Link to="/">
            <Button variant="default">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Stories
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <StarField />
      
      <div className="relative z-10 container mx-auto px-6 py-16 max-w-4xl">
        <Link to="/" className="inline-block mb-8 animate-fade-up">
          <Button variant="ghost" className="hover:bg-card/60">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Stories
          </Button>
        </Link>

        <article className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-12 animate-scale-in">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              {story.title}
            </h1>
            <p className="text-muted-foreground text-sm">
              {new Date(story.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </header>

          <div className="prose prose-lg dark:prose-invert prose-p:text-foreground/90 prose-p:leading-relaxed prose-headings:text-foreground max-w-none">
            {story.content.split("\n\n").map((paragraph, index) => (
              <p
                key={index}
                className="mb-6 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="text-center mt-12 pt-8 border-t border-border/30">
            <div className="animate-fade-up">
              <div className="text-6xl mb-4 animate-[float_3s_ease-in-out_infinite]">🐐</div>
              <p className="text-2xl font-semibold text-primary mb-2">Good night</p>
              <p className="text-xl text-muted-foreground">Sweet dreams 🌙</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default StoryDetail;
