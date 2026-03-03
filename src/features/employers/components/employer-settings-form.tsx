"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  Building2,
  Calendar,
  FileText,
  Globe,
  MapPin,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateEmployerProfileAction } from "@/features/server/employer.action";
import { toast } from "sonner";

const organizationTypeOptions = [
  "development",
  "business",
  "design",
  "android dev",
  "cloud business",
] as const;
type OrganizationType = (typeof organizationTypeOptions)[number];

const teamSizeOptions = ["1-5", "6-20", "21-50"] as const;
type TeamSize = (typeof teamSizeOptions)[number];

// Without as const, TypeScript thinks options is just a generic list of strings (string[]). With as const, TypeScript treats it as a Read-Only Tuple. It knows exactly that:

// Index 0 is "development"

// Index 1 is "business"

// Index 2 is "design"

// Nothing else is allowed.

// Imagine a Vending Machine (The Array).

// typeof Machine: Describes the whole machine.

// typeof Machine[0]: Describes only the chips in the first slot.

// typeof Machine[number]: Describes anything that could possibly come out of that machine.

interface IFormInput {
  username: string;
  email: string;
  name: string;
  description: string;
  yearOfEstablishment: string;
  location: string;
  websiteUrl: string;
  organizationType: OrganizationType;
  teamSize: TeamSize;
}

const EmployerSettingsForm = () => {
  const { register, handleSubmit, control } = useForm<IFormInput>();

  const handleFormSubmit = async (data: IFormInput) => {
    console.log("data: ", data);

    const response = await updateEmployerProfileAction(data);
    if (response.status === "SUCCESS") {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <Card className="w-3/4 ">
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="username">username</Label>
            <Input id="username" type="text" {...register("username")} />
          </div>
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="email">email</Label>
            <Input id="email" type="text" {...register("email")} />
          </div> */}
          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name *</Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="companyName"
                type="text"
                placeholder="Enter company name"
                className="pl-10"
                {...register("name")}
              />
            </div>
          </div>
          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Company Description *</Label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Textarea
                id="description"
                placeholder="Tell us about your company, what you do, and your mission..."
                className="pl-10 min-h-30 resize-none"
                {...register("description")}
              />
            </div>
          </div>
          {/* When you run const { control } = useForm(), you create a specific instance of a form. The <Controller /> component is isolated; it doesn't know which form it belongs to. Passing control={control} connects this specific input to that specific useForm hook. */}
          {/* Organization Type and Team Size - Two columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Organization Type */}
            <div className="space-y-2">
              <Label htmlFor="organizationType">Organization Type *</Label>

              <Controller
                name="organizationType"
                control={control}
                render={({ field }) => (
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="pl-10 w-full ">
                        <SelectValue placeholder="Select organization type" />
                      </SelectTrigger>
                      <SelectContent>
                        {organizationTypeOptions.map((type) => (
                          <SelectItem key={type} value={type}>
                            {/* {capitalizeWords(type)} */}
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
            </div>

            {/* Organization Type */}
            <div className="space-y-2">
              <Label htmlFor="teamSize">Team Size *</Label>
              <Controller
                name="teamSize"
                control={control}
                render={({ field }) => (
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="pl-10 w-full ">
                        <SelectValue placeholder="Select Team Size" />
                      </SelectTrigger>
                      <SelectContent>
                        {teamSizeOptions.map((type) => (
                          <SelectItem key={type} value={type}>
                            {/* {capitalizeWords(type)} */}
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
            </div>
          </div>

          {/* Year of Establishment and Location - Two columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="yearOfEstablishment">
                Year of Establishment *
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="yearOfEstablishment"
                  type="text"
                  placeholder="e.g., 2020"
                  maxLength={4}
                  className="pl-10"
                  {...register("yearOfEstablishment")}
                />
              </div>
            </div>

            {/* Year of Establishment and Location - Two columns */}
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>

              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="location"
                  type="text"
                  placeholder="e.g., Pune, Bangalore"
                  className="pl-10"
                  {...register("location")}
                />
              </div>
            </div>
          </div>
          {/* Website URL */}
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
      </CardContent>
    </Card>
  );
};

export default EmployerSettingsForm;
