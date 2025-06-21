
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables, TablesInsert } from "@/integrations/supabase/types";

type Item = Tables<"items">;
type NewItem = TablesInsert<"items">;

export const useItems = () => {
  return useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      console.log("Fetching items from Supabase...");
      const { data, error } = await supabase
        .from("items")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) {
        console.error("Error fetching items:", error);
        throw error;
      }
      
      console.log("Items fetched successfully:", data);
      return data as Item[];
    },
  });
};

export const useAddItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (newItem: NewItem) => {
      console.log("Adding item to Supabase:", newItem);
      const { data, error } = await supabase
        .from("items")
        .insert([newItem])
        .select()
        .single();
      
      if (error) {
        console.error("Error adding item:", error);
        throw error;
      }
      
      console.log("Item added successfully:", data);
      return data as Item;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
};
