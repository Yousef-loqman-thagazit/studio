
"use client";

import { useState, type FormEvent, useEffect } from 'react';
import type { EmailTemplate } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface EmailTemplateFormProps {
  template: EmailTemplate;
  onSave: (updatedTemplate: EmailTemplate) => void;
}

export function EmailTemplateForm({ template, onSave }: EmailTemplateFormProps) {
  const [subject, setSubject] = useState(template.subject);
  const [body, setBody] = useState(template.body);
  const { toast } = useToast();

  useEffect(() => {
    setSubject(template.subject);
    setBody(template.body);
  }, [template]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave({ ...template, subject, body });
    toast({
      title: 'Template Saved',
      description: `${template.name} has been updated successfully.`,
    });
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle>{template.name}</CardTitle>
        <CardDescription>Customize the content for this email notification.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor={`subject-${template.id}`}>Subject</Label>
            <Input
              id={`subject-${template.id}`}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Email Subject Line"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`body-${template.id}`}>Body</Label>
            <Textarea
              id={`body-${template.id}`}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Email content..."
              rows={10}
              required
              className="min-h-[200px]"
            />
          </div>
          <div>
            <Label className="text-sm font-medium">Available Placeholders:</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {template.placeholders.map(ph => (
                <Badge variant="secondary" key={ph} className="text-xs">{ph}</Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              <Info className="h-3 w-3" />
              Placeholders will be replaced with actual data when emails are sent.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full sm:w-auto">
            <Save className="mr-2 h-4 w-4" />
            Save Template
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
