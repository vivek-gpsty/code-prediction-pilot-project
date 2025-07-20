
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import PredictionResults from "@/components/PredictionResults";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const Dashboard = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<any>(null);
  const [editingRow, setEditingRow] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<any>({});

  const confidenceData = [
    { name: 'High', value: 1012, color: '#14b8a6' },
    { name: 'Moderate', value: 562, color: '#f59e0b' },
    { name: 'Low', value: 89, color: '#ef4444' }
  ];

  const materialsData = [
    {
      id: '1300039968',
      name: '1300039968',
      definition: 'EXP-RPR-ANT-CELL - EXPENSE PLANT...',
      savedPCode: '072',
      predictedPCode: '072',
      savedMaterialGr: '073',
      predictedMaterialGr: '073',
      savedExtMaterial: 'Z10',
      predictedExtMaterial: 'Z10',
      f1Score: '85%',
      confidence: 'high'
    },
    {
      id: '84040602',
      name: '84040602',
      definition: 'MECHANICAL COMPONENT/Canister Po...',
      savedPCode: '071',
      predictedPCode: '070',
      savedMaterialGr: '065',
      predictedMaterialGr: '065',
      savedExtMaterial: 'Z10',
      predictedExtMaterial: 'Z11',
      f1Score: '76%',
      confidence: 'moderate'
    },
    {
      id: '407998160',
      name: '407998160',
      definition: 'GE 15A bullet breake',
      savedPCode: '074',
      predictedPCode: '073',
      savedMaterialGr: '072',
      predictedMaterialGr: '070',
      savedExtMaterial: '209',
      predictedExtMaterial: 'Z10',
      f1Score: '72%',
      confidence: 'moderate'
    },
    {
      id: '1300039948',
      name: '1300039948',
      definition: 'EXP-MAINT-LAB-MW - MAINTENANCE...',
      savedPCode: '071',
      predictedPCode: '071',
      savedMaterialGr: '063',
      predictedMaterialGr: '063',
      savedExtMaterial: 'Z10',
      predictedExtMaterial: 'Z10',
      f1Score: '92%',
      confidence: 'high'
    }
  ];

  const handleEdit = (id: string, field: string, value: string) => {
    setEditValues(prev => ({
      ...prev,
      [`${id}-${field}`]: value
    }));
  };

  const handleSave = (id: string) => {
    setEditingRow(null);
    // Here you would typically save to backend
  };

  const handleViewDetails = (material: any) => {
    setSelectedMaterial(material);
  };

  const getConfidenceBadge = (confidence: string) => {
    const colors = {
      high: 'bg-teal-100 text-teal-800',
      moderate: 'bg-amber-100 text-amber-800',
      low: 'bg-red-100 text-red-800'
    };
    return (
      <Badge className={colors[confidence as keyof typeof colors]}>
        {confidence === 'high' ? '🟢 High confidence' : 
         confidence === 'moderate' ? '🟡 Med confidence' : 
         '🔴 Low confidence'}
      </Badge>
    );
  };

  const columnDefs = useMemo(() => [
    { 
      headerName: "Material name", 
      field: "name" as keyof typeof materialsData[0], 
      width: 120,
      pinned: 'left' as 'left'
    },
    { 
      headerName: "Material definition", 
      field: "definition" as keyof typeof materialsData[0], 
      width: 200,
      cellRenderer: (params: any) => (
        <div className="truncate" title={params.value}>
          {params.value}
        </div>
      )
    },
    { 
      headerName: "Saved P-code", 
      field: "savedPCode" as keyof typeof materialsData[0], 
      width: 120,
      editable: true,
      cellRenderer: (params: any) => {
        const isEditing = editingRow === params.data.id;
        const isDifferent = params.data.savedPCode !== params.data.predictedPCode;
        
        return isEditing ? (
          <Input 
            value={editValues[`${params.data.id}-savedPCode`] || params.value}
            onChange={(e) => handleEdit(params.data.id, 'savedPCode', e.target.value)}
            className="w-16 h-6 text-xs"
          />
        ) : (
          <div className="flex items-center gap-1">
            {params.value}
            {isDifferent && (
              <button 
                onClick={() => setEditingRow(params.data.id)}
                className="text-blue-600 hover:text-blue-800 text-xs"
              >
                ✏️
              </button>
            )}
          </div>
        );
      }
    },
    { 
      headerName: "Predicted P-code", 
      field: "predictedPCode" as keyof typeof materialsData[0], 
      width: 130,
      cellRenderer: (params: any) => (
        <div className="flex items-center gap-2">
          {params.value}
          {params.data.confidence === 'high' && <div className="w-2 h-2 bg-teal-500 rounded-full"></div>}
          {params.data.confidence === 'moderate' && <div className="w-2 h-2 bg-amber-500 rounded-full"></div>}
          {params.data.confidence === 'low' && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
        </div>
      )
    },
    { 
      headerName: "Saved material gr", 
      field: "savedMaterialGr" as keyof typeof materialsData[0], 
      width: 130
    },
    { 
      headerName: "Predicted material gr", 
      field: "predictedMaterialGr" as keyof typeof materialsData[0], 
      width: 150,
      cellRenderer: (params: any) => (
        <div className="flex items-center gap-2">
          {params.value}
          <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
        </div>
      )
    },
    { 
      headerName: "Saved ext material...", 
      field: "savedExtMaterial" as keyof typeof materialsData[0], 
      width: 140
    },
    { 
      headerName: "Predicted ext mater...", 
      field: "predictedExtMaterial" as keyof typeof materialsData[0], 
      width: 150,
      cellRenderer: (params: any) => (
        <div className="flex items-center gap-2">
          {params.value}
          {params.data.confidence === 'moderate' && <div className="w-2 h-2 bg-amber-500 rounded-full"></div>}
        </div>
      )
    },
    { 
      headerName: "F1 Score", 
      field: "f1Score" as keyof typeof materialsData[0], 
      width: 100
    },
    { 
      headerName: "Verdict", 
      field: "confidence" as keyof typeof materialsData[0], 
      width: 140,
      cellRenderer: (params: any) => getConfidenceBadge(params.value)
    },
    { 
      headerName: "Action recommended", 
      colId: "actionRecommended", 
      width: 150,
      cellRenderer: (params: any) => (
        <span className="text-xs">
          {params.data.confidence === 'high' ? 'Manual prediction' : 'Manual cross check'}
        </span>
      )
    },
    { 
      headerName: "", 
      colId: "actions", 
      width: 120,
      pinned: 'right' as 'right',
      cellRenderer: (params: any) => {
        const isEditing = editingRow === params.data.id;
        
        return isEditing ? (
          <Button size="sm" onClick={() => handleSave(params.data.id)}>
            Save
          </Button>
        ) : (
          <Button 
            variant="link" 
            size="sm"
            onClick={() => handleViewDetails(params.data)}
            className="text-blue-600 hover:text-blue-800 p-0"
          >
            View details
          </Button>
        );
      }
    }
  ], [editingRow, editValues]);

  const defaultColDef = useMemo(() => ({
    resizable: true,
    sortable: true,
    filter: true,
    floatingFilter: true
  }), []);

  return (
    <div className="p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Predictive material analysis</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-teal-600 mb-2">81%</div>
            <div className="text-sm text-gray-600">T023 predicted data health</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">P-code prediction confidence</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="w-20 h-20 mx-auto mb-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={confidenceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={25}
                    outerRadius={40}
                    dataKey="value"
                  >
                    {confidenceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center text-2xl font-bold">81%</div>
            <div className="text-xs text-gray-500 space-y-1">
              <div className="flex justify-between">
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>High 1012
                </span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>Moderate 562
                </span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>Low 89
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Material group prediction confidence</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="w-20 h-20 mx-auto mb-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={confidenceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={25}
                    outerRadius={40}
                    dataKey="value"
                  >
                    {confidenceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center text-2xl font-bold">82%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">External material group prediction confidence</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="w-20 h-20 mx-auto mb-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={confidenceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={25}
                    outerRadius={40}
                    dataKey="value"
                  >
                    {confidenceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center text-2xl font-bold">82%</div>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Material - 6 of 1913</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
            <AgGridReact
              rowData={materialsData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              animateRows={true}
              rowSelection="single"
              suppressMovableColumns={true}
              pagination={true}
              paginationPageSize={10}
              domLayout="normal"
            />
          </div>
        </CardContent>
      </Card>

      {/* Material Details Dialog */}
      <Dialog open={!!selectedMaterial} onOpenChange={() => setSelectedMaterial(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Prediction overview
              <button 
                onClick={() => setSelectedMaterial(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </DialogTitle>
          </DialogHeader>
          {selectedMaterial && (
            <PredictionResults 
              materialName={selectedMaterial.name}
              materialDefinition={selectedMaterial.definition}
              onPredictAnother={() => setSelectedMaterial(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
