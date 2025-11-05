-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create stories table
CREATE TABLE public.stories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read stories (public blog)
CREATE POLICY "Stories are viewable by everyone" 
ON public.stories 
FOR SELECT 
USING (true);

-- Create index for sorting by date
CREATE INDEX idx_stories_date ON public.stories(date DESC);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_stories_updated_at
BEFORE UPDATE ON public.stories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample stories
INSERT INTO public.stories (slug, title, date, excerpt, content) VALUES
(
  'the-moonlit-adventure',
  'The Moonlit Adventure',
  '2025-11-05',
  'A little fox discovers a hidden forest where stars whisper secrets to the trees.',
  E'Once upon a time, under the soft silver glow of the moon, a little fox wandered into a forest where stars whispered secrets to the trees.\n\nThe trees swayed gently, their leaves shimmering like tiny mirrors reflecting the night sky. The fox, whose fur was the color of autumn leaves, had always been curious about what lay beyond the meadow where she lived.\n\nAs she ventured deeper into the forest, she noticed something magical: the stars seemed to be dancing, creating patterns in the sky that told stories of old. Each constellation had a tale, and the fox listened intently, her heart filled with wonder.\n\nShe came upon a clearing where a gentle stream flowed, its waters sparkling under the moonlight. The fox dipped her paw into the cool water and felt a sense of peace wash over her. This was a place of magic, a place where dreams were born.\n\nAs the night grew deeper, the fox curled up beneath an ancient oak tree. The stars continued their dance above, and the fox drifted off to sleep, dreaming of all the adventures that awaited her in this enchanted forest.'
),
(
  'the-sleepy-cloud',
  'The Sleepy Cloud',
  '2025-11-04',
  'A tiny cloud learns the art of bringing sweet dreams to children below.',
  E'High above the world, where the sky meets the stars, lived a tiny cloud named Nimbus. Unlike the other clouds who loved to race across the sky, Nimbus preferred to drift slowly, watching the world below.\n\nOne evening, as the sun began to set, painting the sky in shades of pink and orange, Nimbus noticed children getting ready for bed. Some looked worried, others excited, but all of them needed good dreams.\n\nNimbus had a special gift: when the moonlight touched her fluffy edges, she could create the most wonderful dreams. She would gather stardust in her cottony folds and sprinkle it gently over the sleeping town below.\n\nEach grain of stardust carried a different dream - adventures with friendly dragons, tea parties with talking rabbits, or journeys to candy kingdoms. Nimbus loved her job and took great care to match each dream to the right child.\n\nAs the last child fell asleep, Nimbus smiled contentedly. She had done her work well. Now it was time for her to rest too, floating peacefully among her cloud friends, ready to bring more sweet dreams tomorrow night.'
),
(
  'the-garden-of-fireflies',
  'The Garden of Fireflies',
  '2025-11-03',
  'In a secret garden, fireflies guide a young girl through a maze of glowing flowers.',
  E'Luna had always loved summer evenings, but tonight was different. As she stepped into her grandmother''s garden, she noticed something extraordinary - thousands of fireflies dancing among the flowers, their lights creating a magical pathway.\n\nCurious and brave, Luna followed the glowing trail. The fireflies seemed to be leading her somewhere special. The garden was much larger than she remembered, with flowers that hummed soft lullabies and trees that whispered encouraging words.\n\n"Don''t be afraid," the fireflies seemed to say with their gentle blinking. "We have something wonderful to show you."\n\nDeeper into the garden they went, past roses that sparkled like rubies and jasmine that filled the air with the sweetest perfume. Finally, they reached the heart of the garden, where a single, ancient tree stood.\n\nUnder its branches was a cozy nook, perfect for stargazing. The fireflies formed a blanket of stars around Luna, and she felt safer and more loved than ever before. As she gazed up at the real stars above, she made a wish - that everyone could feel this magical peace.\n\nThe fireflies twinkled in agreement, and Luna knew her wish would come true. With a grateful heart, she made her way back home, the fireflies lighting her path, ready for the sweetest sleep of her life.'
);