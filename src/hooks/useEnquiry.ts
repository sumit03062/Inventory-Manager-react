
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TablesInsert } from "@/integrations/supabase/types";

type NewEnquiry = TablesInsert<"enquiries">;

export const useCreateEnquiry = () => {
  return useMutation({
    mutationFn: async (enquiry: NewEnquiry) => {
      console.log("Creating enquiry:", enquiry);
      const { data, error } = await supabase
        .from("enquiries")
        .insert([enquiry])
        .select()
        .single();
      
      if (error) {
        console.error("Error creating enquiry:", error);
        throw error;
      }
      
      console.log("Enquiry created successfully:", data);
      return data;
    },
  });
};
