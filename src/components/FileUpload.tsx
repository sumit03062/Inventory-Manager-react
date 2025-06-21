
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X, Image } from "lucide-react";

interface FileUploadProps {
  label: string;
  multiple?: boolean;
  accept?: string;
  value?: string | string[];
  onChange: (files: string | string[]) => void;
  placeholder?: string;
}

const FileUpload = ({ 
  label, 
  multiple = false, 
  accept = "image/*", 
  value, 
  onChange, 
  placeholder = "Click to upload or drag and drop"
}: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList) => {
    const fileArray = Array.from(files);
    const urls = fileArray.map(file => URL.createObjectURL(file));
    
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      onChange([...currentValues, ...urls]);
    } else {
      onChange(urls[0] || "");
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (indexToRemove: number) => {
    if (multiple && Array.isArray(value)) {
      const newFiles = value.filter((_, index) => index !== indexToRemove);
      onChange(newFiles);
    } else {
      onChange(multiple ? [] : "");
    }
  };

  const displayValue = multiple ? (Array.isArray(value) ? value : []) : (value ? [value as string] : []);

  return (
    <div className="space-y-3">
      <Label className="text-slate-700 font-medium">{label}</Label>
      
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
          dragActive 
            ? "border-ocean-400 bg-ocean-50" 
            : "border-slate-300 hover:border-ocean-300 hover:bg-slate-50"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="flex flex-col items-center space-y-3">
          <div className="p-3 bg-ocean-100 rounded-full">
            <Upload className="h-6 w-6 text-ocean-600" />
          </div>
          <div>
            <p className="text-slate-700 font-medium">{placeholder}</p>
            <p className="text-sm text-slate-500 mt-1">PNG, JPG up to 10MB</p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="border-ocean-200 text-ocean-700 hover:bg-ocean-50"
            onClick={() => inputRef.current?.click()}
          >
            Browse Files
          </Button>
        </div>
      </div>

      {displayValue.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {displayValue.map((file, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                <img
                  src={file}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f1f5f9'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' fill='%2394a3b8'%3EImage%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeFile(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
