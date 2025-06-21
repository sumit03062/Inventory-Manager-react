
import { useState } from "react";
import { useItems } from "@/hooks/useItems";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { Search, ArrowLeft, MessageSquare, Eye, Edit } from "lucide-react";
import EnquiryDialog from "@/components/EnquiryDialog";
import ItemDetailsDialog from "@/components/ItemDetailsDialog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tables } from "@/integrations/supabase/types";

type Item = Tables<"items">;

const ViewItems = () => {
  const { data: items, isLoading, error } = useItems();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<{ id: string; name: string } | null>(null);
  const [selectedItemDetails, setSelectedItemDetails] = useState<Item | null>(null);
  const [enquiryDialogOpen, setEnquiryDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  const filteredItems = items?.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEnquiry = (itemId: string, itemName: string) => {
    setSelectedItem({ id: itemId, name: itemName });
    setEnquiryDialogOpen(true);
  };

  const handleViewDetails = (item: Item) => {
    setSelectedItemDetails(item);
    setDetailsDialogOpen(true);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="container mx-auto">
          <div className="text-center py-12">
            <p className="text-red-600">Error loading items: {error.message}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-ocean-50 to-slate-100 font-poppins flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12 flex-1">
        <div className="flex items-center justify-between mb-8">
        
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search items by name, type, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-32 w-full mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredItems && filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card 
                key={item.id} 
                className="hover:shadow-lg transition-all duration-200 cursor-pointer group"
                onClick={() => handleViewDetails(item)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg group-hover:text-ocean-600 transition-colors">
                        {item.name}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        <Badge variant="secondary">{item.type}</Badge>
                      </CardDescription>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="h-5 w-5 text-ocean-500" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {item.cover_image && (
                    <img
                      src={item.cover_image}
                      alt={item.name}
                      className="w-full h-32 object-cover rounded-md mb-4 group-hover:scale-105 transition-transform duration-200"
                    />
                  )}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {item.description}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails(item);
                      }}
                      className="flex-1 bg-ocean-500 hover:bg-ocean-600"
                      size="sm"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEnquiry(item.id, item.name);
                      }}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Enquire
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              {searchTerm ? "No items found matching your search." : "No items found."}
            </p>
            <Link to="/add-items">
              <Button>Add Your First Item</Button>
            </Link>
          </div>
        )}

        {/* Enquiry Dialog */}
        {selectedItem && (
          <EnquiryDialog
            open={enquiryDialogOpen}
            onOpenChange={setEnquiryDialogOpen}
            itemId={selectedItem.id}
            itemName={selectedItem.name}
          />
        )}

        {/* Item Details Dialog */}
        <ItemDetailsDialog
          item={selectedItemDetails}
          open={detailsDialogOpen}
          onOpenChange={setDetailsDialogOpen}
        />
      </div>

      <Footer />
    </div>
  );
};

export default ViewItems;
