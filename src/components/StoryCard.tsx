import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StoryCardProps {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  index: number;
}

const StoryCard = ({ id, title, date, excerpt, index }: StoryCardProps) => {
  return (
    <Link to={`/stories/${id}`} className="block">
      <Card 
        className="hover-lift bg-card/60 backdrop-blur-sm border-border/50 overflow-hidden group animate-fade-up"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors duration-500">
            {title}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{date}</p>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/80 mb-4">{excerpt}</p>
          <span className="text-primary hover:text-accent transition-colors duration-300 font-medium">
            Read more →
          </span>
        </CardContent>
      </Card>
    </Link>
  );
};

export default StoryCard;
