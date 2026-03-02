"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { Building2, Calendar, FileText, Globe, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";

interface IFormInput {
  username: string;
  email: string;
  name: string;
  description: string;
  yearOfEstablishment: string;
  location: string;
  websiteUrl: string;
}

const EmployerSettingsForm = () => {
  const { register, handleSubmit } = useForm<IFormInput>();

  const handleFormSubmit = (data: IFormInput) => {
    console.log("data:", data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="username">Username</Label>
          <Input id="username" type="text" {...register("username")} />
        </div>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="text" {...register("email")} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="companyName"
              type="text"
              placeholder="Company Name"
              className="pl-10"
              {...register("name")}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Textarea
              id="description"
              placeholder="Tell us about your company, what you do, and your missions..."
              className="pl-10 min-h-30 resize-none"
              {...register("description")}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="yearOfEstablishment">Year of Estabslishment</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="yearOfEstablishment"
                type="text"
                placeholder="e.g., 2028"
                maxLength={4}
                className="pl-10"
                {...register("yearOfEstablishment")}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="location"
                type="text"
                placeholder="e.g., Pune, Bangalore"
                maxLength={4}
                className="pl-10"
                {...register("location")}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="websiteUrl">Website URL (Optional)</Label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="websiteUrl"
              type="text"
              placeholder="https://www.yourcompany.com"
              className="pl-10"
              {...register("websiteUrl")}
            />
          </div>
        </div>

        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
};

export default EmployerSettingsForm;
