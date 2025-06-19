import { useQuery } from "@tanstack/react-query";
import { type Employee } from "@shared/schema";
import { GSAPWrapper } from "@/components/gsap-wrapper";
import { EmployeeForm } from "@/components/employee-form";
import { EmployeeCards } from "@/components/employee-cards";
import { useSplitText } from "@/hooks/use-gsap";
import { CheckCircle } from "lucide-react";

export default function Dashboard() {
  const titleRef = useSplitText("CRYS TECH EMPLOYEE DASHBOARD");
  
  const { data: employees } = useQuery<Employee[]>({
    queryKey: ["/api/employees"],
  });

  return (
    <GSAPWrapper>
      {/* Navigation */}
      <nav className="relative z-10 px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Logo */}
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-slate-900" />
              </div>
              <h1 ref={titleRef} className="text-2xl font-bold split-text" />
            </div>
            <div className="text-sm text-gray-400">
              <span className="text-primary font-semibold">
                {employees?.length || 0}
              </span>{" "}
              Employees Registered
            </div>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Employee Registration Form */}
          <EmployeeForm />

          {/* Employee Cards Display */}
          <EmployeeCards />
        </div>
      </div>
    </GSAPWrapper>
  );
}
