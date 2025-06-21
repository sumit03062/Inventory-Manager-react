
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useCreateEnquiry } from "@/hooks/useEnquiry";
import { Send } from "lucide-react";

interface EnquiryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemId: string;
  itemName: string;
}

const EnquiryDialog = ({ open, onOpenChange, itemId, itemName }: EnquiryDialogProps) => {
  const { toast } = useToast();
  const createEnquiry = useCreateEnquiry();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.name) {
      toast({
        title: "Error",
        description: "Please fill in your name and email",
        variant: "destructive"
      });
      return;
    }

    try {
      await createEnquiry.mutateAsync({
        item_id: itemId,
        user_email: formData.email,
        user_name: formData.name,
        message: formData.message || `I'm interested in learning more about ${itemName}.`
      });

      toast({
        title: "Enquiry Sent!",
        description: "Thank you for your enquiry. We'll get back to you soon.",
        className: "bg-green-50 border-green-200"
      });

      // Reset form and close dialog
      setFormData({ name: "", email: "", message: "" });
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating enquiry:", error);
      toast({
        title: "Error",
        description: "Failed to send enquiry. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Enquire about {itemName}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Your Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Your Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              placeholder={`I'm interested in learning more about ${itemName}...`}
              className="min-h-[80px]"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            disabled={createEnquiry.isPending}
          >
            <Send className="h-4 w-4 mr-2" />
            {createEnquiry.isPending ? "Sending..." : "Send Enquiry"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EnquiryDialog;
