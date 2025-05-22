
"use client";

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUp, UploadCloud } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from "@/components/ui/progress";

export function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      toast({
        title: 'No file selected',
        description: 'Please select an Excel file to upload.',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate file upload
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress <= 100) {
        setUploadProgress(progress);
      } else {
        clearInterval(interval);
        setIsUploading(false);
        setFile(null); // Reset file input
        // Clear the actual input field value
        const fileInput = document.getElementById('excel-file') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
        toast({
          title: 'File Uploaded Successfully',
          description: `${file.name} has been processed. Notifications will be scheduled.`,
        });
      }
    }, 200);
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileUp className="h-6 w-6 text-primary" />
          <CardTitle>Import Employee Data</CardTitle>
        </div>
        <CardDescription>Upload an Excel file with employee names, emails, manager emails, and course start dates.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="excel-file">Excel File</Label>
            <div className="flex items-center gap-2">
              <Input
                id="excel-file"
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                disabled={isUploading}
                className="flex-grow"
              />
            </div>
            {file && !isUploading && <p className="text-sm text-muted-foreground">Selected file: {file.name}</p>}
          </div>
          {isUploading && (
            <div className="space-y-1">
              <Progress value={uploadProgress} className="w-full" />
              <p className="text-sm text-muted-foreground text-center">Uploading: {uploadProgress}%</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isUploading || !file} className="w-full">
            <UploadCloud className="mr-2 h-4 w-4" />
            {isUploading ? 'Uploading...' : 'Upload and Process'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
