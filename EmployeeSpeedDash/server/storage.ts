import mongoose, { Document, Schema } from "mongoose";
import { type Employee, type InsertEmployee } from "@shared/schema";

// MongoDB Employee Schema
interface IEmployeeDocument extends Document {
  id: number;
  employerId: string;
  fullName: string;
  dateOfJoining: string;
  department: string;
  designation: string;
  location: string;
  email: string;
  phone: string;
}

const employeeSchema = new Schema<IEmployeeDocument>({
  id: { type: Number, required: true, unique: true },
  employerId: { type: String, required: true },
  fullName: { type: String, required: true },
  dateOfJoining: { type: String, required: true },
  department: { type: String, required: true },
  designation: { type: String, required: true },
  location: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
}, {
  timestamps: true,
});

const EmployeeModel = mongoose.model<IEmployeeDocument>("Employee", employeeSchema);

export interface IStorage {
  connect(): Promise<void>;
  getEmployee(id: number): Promise<Employee | undefined>;
  getEmployeeByEmail(email: string): Promise<Employee | undefined>;
  createEmployee(employee: InsertEmployee): Promise<Employee>;
  getAllEmployees(): Promise<Employee[]>;
  deleteEmployee(id: number): Promise<boolean>;
}

export class MongoStorage implements IStorage {
  private currentId: number = 1;
  private isConnected: boolean = false;

  async connect(): Promise<void> {
    if (this.isConnected) return;

    try {
      const mongoUri = "mongodb+srv://bastoffcial:aI4fEcricKXwBZ4f@speedo.swuhr8z.mongodb.net/speedo_employees?retryWrites=true&w=majority";
      
      await mongoose.connect(mongoUri);
      console.log("✅ Connected to MongoDB");
      this.isConnected = true;

      // Get the current max ID to continue auto-increment
      const lastEmployee = await EmployeeModel.findOne().sort({ id: -1 });
      if (lastEmployee) {
        this.currentId = lastEmployee.id + 1;
      }
    } catch (error) {
      console.error("❌ MongoDB connection error:", error);
      throw new Error("Failed to connect to MongoDB");
    }
  }

  async getEmployee(id: number): Promise<Employee | undefined> {
    try {
      const employee = await EmployeeModel.findOne({ id });
      return employee ? this.toEmployee(employee) : undefined;
    } catch (error) {
      console.error("Error fetching employee:", error);
      return undefined;
    }
  }

  async getEmployeeByEmail(email: string): Promise<Employee | undefined> {
    try {
      const employee = await EmployeeModel.findOne({ email });
      return employee ? this.toEmployee(employee) : undefined;
    } catch (error) {
      console.error("Error fetching employee by email:", error);
      return undefined;
    }
  }

  async createEmployee(insertEmployee: InsertEmployee): Promise<Employee> {
    try {
      const id = this.currentId++;
      const newEmployee = new EmployeeModel({
        ...insertEmployee,
        id,
      });
      
      const saved = await newEmployee.save();
      return this.toEmployee(saved);
    } catch (error) {
      console.error("Error creating employee:", error);
      throw new Error("Failed to create employee");
    }
  }

  async getAllEmployees(): Promise<Employee[]> {
    try {
      const employees = await EmployeeModel.find().sort({ id: 1 });
      return employees.map(emp => this.toEmployee(emp));
    } catch (error) {
      console.error("Error fetching all employees:", error);
      return [];
    }
  }

  async deleteEmployee(id: number): Promise<boolean> {
    try {
      const result = await EmployeeModel.deleteOne({ id });
      return result.deletedCount > 0;
    } catch (error) {
      console.error("Error deleting employee:", error);
      return false;
    }
  }

  private toEmployee(doc: IEmployeeDocument): Employee {
    return {
      id: doc.id,
      employerId: doc.employerId,
      fullName: doc.fullName,
      dateOfJoining: doc.dateOfJoining,
      department: doc.department,
      designation: doc.designation,
      location: doc.location,
      email: doc.email,
      phone: doc.phone,
    };
  }
}

export const storage = new MongoStorage();
