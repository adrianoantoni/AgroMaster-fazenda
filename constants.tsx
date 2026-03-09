
import { Crop, Plot, InventoryItem, FinanceRecord, Animal, FieldTask } from './types';

export const MOCK_CROPS: Crop[] = [
  { id: 'c1', name: 'Milho', variety: 'Hybrid-99', plotId: 'p1', plantedAt: '2023-11-15', expectedHarvest: '2024-03-20', status: 'Growing', area: 50 },
  { id: 'c2', name: 'Café', variety: 'Arabica', plotId: 'p2', plantedAt: '2022-05-10', expectedHarvest: '2024-06-15', status: 'Growing', area: 120 },
  { id: 'c3', name: 'Trigo', variety: 'Spring-A', plotId: 'p3', plantedAt: '2023-10-01', expectedHarvest: '2024-02-10', status: 'Harvested', area: 80 },
  { id: 'c4', name: 'Soja', variety: 'Bio-Seed 4', plotId: 'p1', plantedAt: '2023-12-05', expectedHarvest: '2024-04-15', status: 'Growing', area: 45 },
  { id: 'c5', name: 'Arroz', variety: 'Long Grain X', plotId: 'p3', plantedAt: '2023-12-20', expectedHarvest: '2024-05-30', status: 'Growing', area: 30 },
];

export const MOCK_PLOTS: Plot[] = [
  { id: 'p1', name: 'Setor Norte A-1', soilType: 'Argiloso', coordinates: [], phLevel: 6.2, organicMatter: '4.2%' },
  { id: 'p2', name: 'East Ridge B', soilType: 'Arenoso', coordinates: [], phLevel: 5.8, organicMatter: '3.1%' },
  { id: 'p3', name: 'River Flat C', soilType: 'Aluvial', coordinates: [], phLevel: 6.5, organicMatter: '5.0%' },
];

export const MOCK_INVENTORY: InventoryItem[] = [
  { id: 'i1', name: 'NPK 15-15-15', category: 'Fertilizer', quantity: 1500, unit: 'kg', minThreshold: 500 },
  { id: 'i2', name: 'Sementes Milho H99', category: 'Seed', quantity: 200, unit: 'kg', minThreshold: 50 },
  { id: 'i3', name: 'Diesel S10', category: 'Fuel', quantity: 500, unit: 'L', minThreshold: 1000 },
  { id: 'i4', name: 'Ração Crescimento A+', category: 'Feed', quantity: 2400, unit: 'kg', minThreshold: 1000 },
];

export const MOCK_FINANCE: FinanceRecord[] = [
  { id: 'f1', date: '2024-01-05', type: 'Expense', category: 'Insumos', amount: 12500.00, description: 'Compra NPK 15-15-15', status: 'Paid' },
  { id: 'f2', date: '2024-01-10', type: 'Income', category: 'Vendas', amount: 45000.00, description: 'Venda de Safra de Trigo', status: 'Paid' },
  { id: 'f3', date: '2024-01-15', type: 'Expense', category: 'Mão de Obra', amount: 8000.00, description: 'Pagamento Sazonal', status: 'Pending' },
  { id: 'f4', date: '2024-01-22', type: 'Expense', category: 'Manutenção', amount: 3200.00, description: 'Reparo Trator Massey', status: 'Overdue' },
  { id: 'f5', date: '2024-01-25', type: 'Income', category: 'Vendas', amount: 12000.00, description: 'Venda Milho Granel', status: 'Paid' },
  { id: 'f6', date: '2024-01-28', type: 'Expense', category: 'Energia', amount: 1500.00, description: 'Fatura Elétrica Jan', status: 'Paid' },
  { id: 'f7', date: '2024-01-30', type: 'Expense', category: 'Transporte', amount: 4500.00, description: 'Logística de Escoamento', status: 'Pending' },
  { id: 'f8', date: '2024-02-01', type: 'Income', category: 'Subsídios', amount: 50000.00, description: 'Subsídio Agrícola Estatal', status: 'Paid' },
];

export const MOCK_ANIMALS: Animal[] = [
  { id: 'a1', tagId: 'B-001', species: 'Gado', breed: 'Brahman', status: 'Healthy', lastCheckup: '2024-01-02' },
  { id: 'a2', tagId: 'B-002', species: 'Gado', breed: 'Angus', status: 'Pregnant', lastCheckup: '2024-01-12' },
  { id: 'a3', tagId: 'B-015', species: 'Gado', breed: 'Nelore', status: 'Healthy', lastCheckup: '2024-01-18' },
  { id: 'a4', tagId: 'B-016', species: 'Gado', breed: 'Nelore', status: 'Sick', lastCheckup: '2024-01-20' },
  { id: 'a5', tagId: 'B-017', species: 'Gado', breed: 'Brahman', status: 'Healthy', lastCheckup: '2024-01-21' },
  { id: 'a6', tagId: 'B-018', species: 'Gado', breed: 'Angus', status: 'Healthy', lastCheckup: '2024-01-22' },
  { id: 'a7', tagId: 'B-019', species: 'Gado', breed: 'Nelore', status: 'Healthy', lastCheckup: '2024-01-23' },
  { id: 'a8', tagId: 'B-020', species: 'Gado', breed: 'Brahman', status: 'Pregnant', lastCheckup: '2024-01-24' },
];

export const MOCK_TASKS: FieldTask[] = [
  { id: 't1', assignedTo: 'João Silva', description: 'Verificação Irrigação Norte', dueDate: '2024-01-25', status: 'Pending', location: '{"x": 250, "y": 180}' },
  { id: 't2', assignedTo: 'Maria Santos', description: 'Teste de pH Talhão B', dueDate: '2024-01-26', status: 'In Progress', location: '{"x": 500, "y": 250}' },
  { id: 't3', assignedTo: 'Carlos Pedro', description: 'Manutenção Grade Disco', dueDate: '2024-01-27', status: 'Pending', location: '{"x": 380, "y": 300}' },
  { id: 't4', assignedTo: 'João Silva', description: 'Pulverização Lote A', dueDate: '2024-01-28', status: 'Pending', location: '{"x": 300, "y": 150}' },
  { id: 't5', assignedTo: 'Maria Santos', description: 'Coleta de Amostras Solo', dueDate: '2024-01-29', status: 'Completed', location: '{"x": 550, "y": 350}' },
];
