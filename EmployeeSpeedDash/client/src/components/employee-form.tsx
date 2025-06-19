import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertEmployeeSchema, type InsertEmployee } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useSplitText, useMagneticButton } from "@/hooks/use-gsap";
import { Plus } from "lucide-react";

export function EmployeeForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const buttonRef = useMagneticButton();
  const titleRef = useSplitText("Register New Employee");

  const form = useForm<InsertEmployee>({
    resolver: zodResolver(insertEmployeeSchema),
    defaultValues: {
      employerId: "",
      fullName: "",
      dateOfJoining: "",
      department: "",
      designation: "",
      location: "",
      email: "",
      phone: "",
    },
  });

  const createEmployeeMutation = useMutation({
    mutationFn: async (data: InsertEmployee) => {
      const response = await apiRequest("POST", "/api/employees", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/employees"] });
      form.reset();
      toast({
        title: "Success!",
        description: "Employee registered successfully",
      });
      setIsSubmitting(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to register employee",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = async (data: InsertEmployee) => {
    setIsSubmitting(true);
    createEmployeeMutation.mutate(data);
  };

  return (
    <Card className="glass-morphism border-white/20 bg-white/5">
      <CardContent className="p-8">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5" />
          <div className="relative z-10">
            <h2 ref={titleRef} className="text-3xl font-bold mb-8 split-text" />
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="employerId"
                  render={({ field }) => (
                    <FormItem className="form-field">
                      <FormLabel className="text-gray-300">Employer ID</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter employer ID"
                          className="bg-white/10 border-white/20 focus:ring-primary focus:border-transparent backdrop-blur-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem className="form-field">
                      <FormLabel className="text-gray-300">Full Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter full name"
                          className="bg-white/10 border-white/20 focus:ring-primary focus:border-transparent backdrop-blur-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dateOfJoining"
                  render={({ field }) => (
                    <FormItem className="form-field">
                      <FormLabel className="text-gray-300">Date of Joining</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="date"
                          className="bg-white/10 border-white/20 focus:ring-primary focus:border-transparent backdrop-blur-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem className="form-field">
                      <FormLabel className="text-gray-300">Department</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white/10 border-white/20 focus:ring-primary focus:border-transparent backdrop-blur-sm">
                            <SelectValue placeholder="Select Department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-slate-800 border-white/20">
                          <SelectItem value="Engineering">Engineering</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Sales">Sales</SelectItem>
                          <SelectItem value="HR">Human Resources</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="Operations">Operations</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="designation"
                  render={({ field }) => (
                    <FormItem className="form-field">
                      <FormLabel className="text-gray-300">Designation</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter designation"
                          className="bg-white/10 border-white/20 focus:ring-primary focus:border-transparent backdrop-blur-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="form-field">
                      <FormLabel className="text-gray-300">Location</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter location"
                          className="bg-white/10 border-white/20 focus:ring-primary focus:border-transparent backdrop-blur-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="form-field">
                      <FormLabel className="text-gray-300">Email ID</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter email address"
                          className="bg-white/10 border-white/20 focus:ring-primary focus:border-transparent backdrop-blur-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="form-field">
                      <FormLabel className="text-gray-300">Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="tel"
                          placeholder="Enter phone number"
                          className="bg-white/10 border-white/20 focus:ring-primary focus:border-transparent backdrop-blur-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  ref={buttonRef}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-primary/80 text-slate-900 font-semibold py-4 magnetic-button hover:scale-105 focus:ring-4 focus:ring-primary/50"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  {isSubmitting ? "Registering..." : "Register Employee"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
