import { useState, useEffect } from "react"; // Added useEffect
import { useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Edit, Trash2, X, Check, Calendar, Tag, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Tables } from "@/integrations/supabase/types";

type Item = Tables<"items">;

interface ItemDetailsDialogProps {
  item: Item | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ItemDetailsDialog = ({ item, open, onOpenChange }: ItemDetailsDialogProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    type: "",
    description: "",
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // FIXED: Replaced useState with useEffect for proper initialization
  useEffect(() => {
    if (item) {
      setEditForm({
        name: item.name || "",
        type: item.type || "",
        description: item.description || "",
      });
    }
    // Reset states when item changes
    setIsEditing(false);
    setIsDeleting(false);
  }, [item]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!item) return;

    try {
      const { error } = await supabase
        .from("items")
        .update({
          name: editForm.name,
          type: editForm.type,
          description: editForm.description,
          updated_at: new Date().toISOString(),
        })
        .eq("id", item.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Item updated successfully",
      });

      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ["items"] });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update item",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!item) return;

    try {
      const { error } = await supabase
        .from("items")
        .delete()
        .eq("id", item.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Item deleted successfully",
      });

      setIsDeleting(false);
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["items"] });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete item",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsDeleting(false);
    if (item) {
      setEditForm({
        name: item.name || "",
        type: item.type || "",
        description: item.description || "",
      });
    }
  };

  if (!item) return null;

  // Added type safety for additional_images
  const additionalImages = item.additional_images as string[] | null;

  return (
    <Dialog open={open} onOpenChange={(open) => {
      if (!open) {
        handleCancel();
      }
      onOpenChange(open);
    }}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Item Details</span>
           
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Cover Image */}
          {item.cover_image && (
            <div className="w-full">
              <img
                src={item.cover_image}
                alt={item.name}
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </div>
          )}

          {/* Basic Information */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Item Name
                </Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    placeholder="Enter item name"
                  />
                ) : (
                  <p className="text-lg font-semibold">{item.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="type" className="flex items-center gap-2">
                  <Badge className="h-4 w-4" />
                  Type
                </Label>
                {isEditing ? (
                  <Input
                    id="type"
                    value={editForm.type}
                    onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                    placeholder="Enter item type"
                  />
                ) : (
                  <Badge variant="secondary" className="w-fit">
                    {item.type}
                  </Badge>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Description
              </Label>
              {isEditing ? (
                <Textarea
                  id="description"
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  placeholder="Enter item description"
                  rows={4}
                />
              ) : (
                <p className="text-gray-600">{item.description}</p>
              )}
            </div>
          </div>

          <Separator />

          {/* Additional Images - Fixed type handling */}
          {additionalImages && additionalImages.length > 0 && (
            <div className="space-y-3">
              <Label className="text-lg font-semibold">Additional Images</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {additionalImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${item.name} - Image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg shadow-sm"
                  />
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Created: {new Date(item.created_at).toLocaleDateString()}</span>
            </div>
            {item.updated_at !== item.created_at && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Updated: {new Date(item.updated_at).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ItemDetailsDialog;