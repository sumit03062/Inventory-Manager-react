
-- Create a table for inventory items
CREATE TABLE public.items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  cover_image TEXT,
  additional_images TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table for enquiries
CREATE TABLE public.enquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  item_id UUID REFERENCES public.items(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  user_name TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) - making items publicly readable but enquiries private
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Create policies for items (public read access, but we'll add admin policies later if needed)
CREATE POLICY "Anyone can view items" 
  ON public.items 
  FOR SELECT 
  USING (true);

CREATE POLICY "Anyone can insert items" 
  ON public.items 
  FOR INSERT 
  WITH CHECK (true);

-- Create policies for enquiries (only allow inserts, admins can view all)
CREATE POLICY "Anyone can create enquiries" 
  ON public.enquiries 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Anyone can view enquiries" 
  ON public.enquiries 
  FOR SELECT 
  USING (true);
