import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { type Employee } from "@shared/schema";
import { useCardAnimation, useSplitText } from "@/hooks/use-gsap";
import { Users, Building2 } from "lucide-react";

export function EmployeeCards() {
  const titleRef = useSplitText("Our Team");
  
  const { data: employees, isLoading, error } = useQuery<Employee[]>({
    queryKey: ["/api/employees"],
  });

  const cardsRef = useCardAnimation([employees?.length]);

  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map(name => name[0])
      .join("")
      .toUpperCase();
  };

  const getDepartmentStats = () => {
    if (!employees) return { total: 0, departments: 0 };
    const uniqueDepartments = new Set(employees.map(emp => emp.department));
    return {
      total: employees.length,
      departments: uniqueDepartments.size,
    };
  };

  const stats = getDepartmentStats();

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Card className="glass-morphism border-white/20 bg-white/5">
          <CardContent className="p-8">
            <Skeleton className="h-10 w-32 mb-8" />
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <Card className="glass-morphism border-white/20 bg-white/5">
          <CardContent className="p-8">
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-12 h-12 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Error Loading Employees</h3>
              <p className="text-gray-400">Please try refreshing the page</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Card className="glass-morphism border-white/20 bg-white/5">
        <CardContent className="p-8">
          <h2 ref={titleRef} className="text-3xl font-bold mb-8 split-text" />
          
          <div ref={cardsRef} className="space-y-6">
            {employees && employees.length > 0 ? (
              employees.map((employee) => (
                <div
                  key={employee.id}
                  className="employee-card glass-morphism-strong rounded-2xl p-6 border-white/20 bg-white/5 transform transition-all duration-500 hover:scale-105"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center font-bold text-lg text-slate-900">
                      {getInitials(employee.fullName)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-white">
                        {employee.fullName}
                      </h3>
                      <p className="text-primary text-sm font-medium">
                        {employee.designation}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-400 mt-1">
                        <span>{employee.department}</span>
                        <span>•</span>
                        <span>{employee.location}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-xs text-gray-400">Active</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No Employees Yet</h3>
                <p className="text-gray-400">Register your first employee to get started</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="glass-morphism border-white/20 bg-white/5 text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-primary mb-2">{stats.total}</div>
            <div className="text-sm text-gray-400 flex items-center justify-center gap-1">
              <Users className="w-4 h-4" />
              Total Employees
            </div>
          </CardContent>
        </Card>
        <Card className="glass-morphism border-white/20 bg-white/5 text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-primary mb-2">{stats.departments}</div>
            <div className="text-sm text-gray-400 flex items-center justify-center gap-1">
              <Building2 className="w-4 h-4" />
              Departments
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
