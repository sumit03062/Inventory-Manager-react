
import { useState } from "react";
import { useAddItem } from "@/hooks/useItems";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Sparkles, CheckCircle } from "lucide-react";
import FileUpload from "@/components/FileUpload";
import Navbar from "@/components/Navbar";

const AddItems = () => {
  const { toast } = useToast();
  const addItem = useAddItem();
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    cover_image: "",
    additional_images: [] as string[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.type || !formData.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      await addItem.mutateAsync({
        name: formData.name,
        type: formData.type,
        description: formData.description,
        cover_image: formData.cover_image || null,
        additional_images: formData.additional_images,
      });

      toast({
        title: "Success!",
        description: "Item successfully added to your inventory",
        className: "bg-green-50 border-green-200 text-green-800"
      });

      // Reset form
      setFormData({
        name: "",
        type: "",
        description: "",
        cover_image: "",
        additional_images: [],
      });
    } catch (error) {
      console.error("Error adding item:", error);
      toast({
        title: "Error",
        description: "Failed to add item. Please try again.",
        variant: "destructive"
      });
    }
  };

  const itemTypes = [
    "Shirt",
    "Pant", 
    "Shoes",
    "Sports Gear",
    "Electronics",
    "Furniture",
    "Books",
    "Tools",
    "Home & Garden",
    "Automotive",
    "Other"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-ocean-50 to-slate-100 font-poppins">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-ocean-500 to-ocean-600 rounded-3xl mb-6 shadow-2xl">
              <Plus className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-slate-800 mb-4">
              Add New Item
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Add a new item to your inventory with detailed information and images
            </p>
          </div>
          
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-ocean-500/5 to-ocean-600/10" />
            <CardHeader className="pb-8 relative bg-gradient-to-r from-white to-slate-50/50">
              <CardTitle className="flex items-center gap-4 text-3xl text-slate-800">
                <Sparkles className="h-8 w-8 text-ocean-500" />
                Item Details
              </CardTitle>
              <CardDescription className="text-slate-600 text-lg">
                Fill in the information about your new inventory item
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 p-8 relative">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Item Name */}
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-slate-700 font-semibold text-lg">
                      Item Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter the name of your item"
                      required
                      className="h-14 border-slate-300 focus:border-ocean-400 focus:ring-ocean-400 text-lg rounded-xl bg-white/80 backdrop-blur-sm"
                    />
                  </div>

                  {/* Item Type */}
                  <div className="space-y-3">
                    <Label htmlFor="type" className="text-slate-700 font-semibold text-lg">
                      Item Type *
                    </Label>
                    <Select 
                      value={formData.type} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                      required
                    >
                      <SelectTrigger className="h-14 border-slate-300 focus:border-ocean-400 focus:ring-ocean-400 text-lg rounded-xl bg-white/80 backdrop-blur-sm">
                        <SelectValue placeholder="Select item category" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-slate-200 rounded-xl shadow-xl">
                        {itemTypes.map((type) => (
                          <SelectItem key={type} value={type} className="text-lg py-4 hover:bg-ocean-50">
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <Label htmlFor="description" className="text-slate-700 font-semibold text-lg">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Provide a detailed description including condition, features, and any other relevant information..."
                    className="min-h-[140px] border-slate-300 focus:border-ocean-400 focus:ring-ocean-400 text-lg resize-none rounded-xl bg-white/80 backdrop-blur-sm"
                    required
                  />
                </div>

                {/* Cover Image Upload */}
                <div className="bg-slate-50/50 p-6 rounded-2xl">
                  <FileUpload
                    label="Cover Image"
                    value={formData.cover_image}
                    onChange={(file) => setFormData(prev => ({ ...prev, cover_image: file as string }))}
                    placeholder="Upload your main item image"
                  />
                </div>

                {/* Additional Images Upload */}
                <div className="bg-slate-50/50 p-6 rounded-2xl">
                  <FileUpload
                    label="Additional Images (Optional)"
                    multiple
                    value={formData.additional_images}
                    onChange={(files) => setFormData(prev => ({ ...prev, additional_images: files as string[] }))}
                    placeholder="Upload additional item images"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-8">
                  <Button 
                    type="submit" 
                    className="w-full h-16 bg-gradient-to-r from-ocean-500 to-ocean-600 hover:from-ocean-600 hover:to-ocean-700 text-white font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
                    disabled={addItem.isPending}
                  >
                    {addItem.isPending ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        Adding Item...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-6 w-6 mr-3" />
                        Add Item to Inventory
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddItems;
