
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

const ComprehensiveAnalysis = () => {
  const [selectedFile, setSelectedFile] = useState("T023-Q1-25");
  const [viewPredictionFor, setViewPredictionFor] = useState("All");
  const [fromDate, setFromDate] = useState("2023-01-01");
  const [toDate, setToDate] = useState("2024-01-18");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const handleRunPrediction = () => {
    setIsProcessing(true);
    setProgress(0);
    
    // Simulate file processing
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 98) {
          clearInterval(progressInterval);
          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
          return 98;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  if (isProcessing) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Predictive material analysis</h1>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <div className="w-32 h-32 mx-auto border-4 border-dashed border-purple-300 rounded-lg flex items-center justify-center">
                <div className="text-4xl">📁</div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Cleansing file</h3>
                <Progress value={progress} className="w-64 mx-auto mb-2" />
                <p className="text-sm text-gray-600">{Math.round(progress)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Predictive material analysis</h1>
      </div>

      <Card className="max-w-4xl">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            <div className="space-y-2">
              <Label htmlFor="dataFile" className="text-sm font-medium">
                Select data file <span className="text-red-500">*</span>
              </Label>
              <Select value={selectedFile} onValueChange={setSelectedFile}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="T023-Q1-25">T023-Q1-25</SelectItem>
                  <SelectItem value="T023-Q2-25">T023-Q2-25</SelectItem>
                  <SelectItem value="T023-Q3-25">T023-Q3-25</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="viewPrediction" className="text-sm font-medium">
                View prediction for
              </Label>
              <Select value={viewPredictionFor} onValueChange={setViewPredictionFor}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Mismatched P-codes">Mismatched P-codes</SelectItem>
                  <SelectItem value="Material Groups">Material Groups</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fromDate" className="text-sm font-medium">
                From date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="fromDate"
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="toDate" className="text-sm font-medium">
                To date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="toDate"
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <Button 
              onClick={handleRunPrediction}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            >
              ⚡ Run prediction
            </Button>
            <Button variant="outline">
              Check data quality
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComprehensiveAnalysis;
