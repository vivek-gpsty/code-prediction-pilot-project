
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import PredictionResults from "@/components/PredictionResults";

const IndividualAnalysis = () => {
  const [materialName, setMaterialName] = useState("");
  const [materialDefinition, setMaterialDefinition] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [showPredictDialog, setShowPredictDialog] = useState(false);
  const navigate = useNavigate();

  const handleRunPrediction = () => {
    if (materialName && materialDefinition) {
      setShowResults(true);
    }
  };

  const handlePredictAnother = () => {
    setShowPredictDialog(true);
  };

  const handleNewPrediction = () => {
    setMaterialName("");
    setMaterialDefinition("");
    setShowResults(false);
    setShowPredictDialog(false);
  };

  if (showResults) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Predictive material analysis</h1>
        </div>
        
        <PredictionResults 
          materialName={materialName}
          materialDefinition={materialDefinition}
          onPredictAnother={handlePredictAnother}
        />

        <Dialog open={showPredictDialog} onOpenChange={setShowPredictDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Predict for another material</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-gray-600">Would you like to start a new prediction?</p>
              <div className="flex gap-3">
                <Button onClick={handleNewPrediction} className="flex-1">
                  New Prediction
                </Button>
                <Button variant="outline" onClick={() => setShowPredictDialog(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Predictive material analysis</h1>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Individual analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="materialName" className="text-sm font-medium">
              Material name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="materialName"
              value={materialName}
              onChange={(e) => setMaterialName(e.target.value)}
              placeholder="84040602"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="materialDefinition" className="text-sm font-medium">
              Material definition <span className="text-red-500">*</span>
            </Label>
            <Input
              id="materialDefinition"
              value={materialDefinition}
              onChange={(e) => setMaterialDefinition(e.target.value)}
              placeholder="MECHANICAL COMPONENT/Canister Pole Mount"
              className="w-full"
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => navigate('/')}>
              Cancel
            </Button>
            <Button 
              onClick={handleRunPrediction}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!materialName || !materialDefinition}
            >
              ⚡ Run prediction
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IndividualAnalysis;
