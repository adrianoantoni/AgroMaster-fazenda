
export enum UserRole {
  ADMIN = 'Admin',
  MANAGER = 'Manager',
  SUPERVISOR = 'Supervisor',
  TECHNICIAN = 'Technician',
  FIELD_WORKER = 'Field Worker',
  ACCOUNTANT = 'Accountant'
}

export interface CropCycleEvent {
  id: string;
  date: string;
  type: 'Planting' | 'Fertilization' | 'Pesticide' | 'Irrigation' | 'Harvest';
  description: string;
}

export interface Crop {
  id: string;
  name: string;
  variety: string;
  plotId: string;
  plantedAt: string;
  expectedHarvest: string;
  status: 'Growing' | 'Harvested' | 'Problem';
  area: number;
  cycleEvents?: CropCycleEvent[];
}

export interface Plot {
  id: string;
  name: string;
  coordinates: [number, number][];
  soilType: string;
  currentCropId?: string;
  phLevel?: number;
  organicMatter?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'Seed' | 'Fertilizer' | 'Pesticide' | 'Fuel' | 'Feed' | 'Medicine';
  quantity: number;
  unit: string;
  minThreshold: number;
}

export interface FinanceRecord {
  id: string;
  date: string;
  type: 'Income' | 'Expense';
  category: string;
  amount: number;
  description: string;
  status: 'Pending' | 'Paid' | 'Overdue';
}

export interface HealthRecord {
  date: string;
  treatment: string;
  medicine: string;
  dosage: string;
  professional: string;
}

export interface FeedingLog {
  date: string;
  feedType: string;
  amount: string;
  nutritionist: string;
}

export interface Animal {
  id: string;
  tagId: string;
  species: string;
  breed: string;
  status: 'Healthy' | 'Sick' | 'Pregnant' | 'Sold';
  lastCheckup: string;
  healthHistory?: HealthRecord[];
  feedingHistory?: FeedingLog[];
  birthDate?: string;
}

export interface FieldTask {
  id: string;
  assignedTo: string;
  description: string;
  dueDate: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  location?: string;
  photoUrl?: string;
}
