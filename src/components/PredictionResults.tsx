
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface PredictionResultsProps {
  materialName: string;
  materialDefinition: string;
  onPredictAnother: () => void;
}

const PredictionResults = ({ materialName, materialDefinition, onPredictAnother }: PredictionResultsProps) => {
  const [savedPCode, setSavedPCode] = useState("074");
  const [savedMaterialGroup, setSavedMaterialGroup] = useState("070");
  const [savedExtMaterialGroup, setSavedExtMaterialGroup] = useState("Z11");
  const [isEditing, setIsEditing] = useState({ pcode: false, mg: false, emg: false });

  const predictionData = {
    pcode: { predicted: "072", f1Score: 76, confidence: "moderate", supports: 88 },
    materialGroup: { predicted: "070", f1Score: 87, confidence: "high", supports: 188 },
    extMaterialGroup: { predicted: "Z10", f1Score: 77, confidence: "moderate", supports: 188 }
  };

  const handleSave = (type: 'pcode' | 'mg' | 'emg', value: string) => {
    if (type === 'pcode') setSavedPCode(value);
    if (type === 'mg') setSavedMaterialGroup(value);
    if (type === 'emg') setSavedExtMaterialGroup(value);
    setIsEditing(prev => ({ ...prev, [type]: false }));
    toast({
      title: "Updates saved successfully",
      description: "The updated data has been successfully saved to SAP.",
    });
  };

  const ConfidenceIndicator = ({ confidence, score }: { confidence: string; score: number }) => {
    const getColorClass = () => {
      if (confidence === 'high') return 'text-teal-600 bg-teal-50';
      if (confidence === 'moderate') return 'text-amber-600 bg-amber-50';
      return 'text-red-600 bg-red-50';
    };

    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getColorClass()}`}>
        <div className={`w-2 h-2 rounded-full ${confidence === 'high' ? 'bg-teal-500' : confidence === 'moderate' ? 'bg-amber-500' : 'bg-red-500'}`}></div>
        {confidence === 'high' ? 'Reliable data' : 'Manual cross check recommended'}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">P-code Prediction and Material Group Analysis</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4 flex items-center gap-4">
            Prediction overview
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                <span>High confidence</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span>Moderate confidence</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Low confidence</span>
              </div>
            </div>
          </h3>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Material name</span>
              <div>{materialName}</div>
            </div>
            <div>
              <span className="font-medium">Material definition</span>
              <div>{materialDefinition}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* P-code Card */}
          <Card className="p-4 bg-amber-50 border-amber-200">
            <CardContent className="p-0">
              <h4 className="font-semibold text-lg mb-2">Predicted P-code</h4>
              <div className="text-3xl font-bold mb-4">{predictionData.pcode.predicted}</div>
              
              <div className="space-y-3">
                <div className="bg-white p-3 rounded">
                  <div className="text-sm text-gray-600 mb-1">F1 Score (of {predictionData.pcode.supports} supports)</div>
                  <div className="text-xl font-semibold text-amber-600">{predictionData.pcode.f1Score}%</div>
                  <ConfidenceIndicator confidence={predictionData.pcode.confidence} score={predictionData.pcode.f1Score} />
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 mb-2">Saved P-code</div>
                  {isEditing.pcode ? (
                    <div className="flex gap-2">
                      <Input 
                        value={savedPCode} 
                        onChange={(e) => setSavedPCode(e.target.value)}
                        className="w-20 h-8 text-sm"
                      />
                      <Button size="sm" onClick={() => handleSave('pcode', savedPCode)}>
                        Update
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{savedPCode}</span>
                      <button 
                        onClick={() => setIsEditing(prev => ({ ...prev, pcode: true }))}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ✏️
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Material Group Card */}
          <Card className="p-4 bg-teal-50 border-teal-200">
            <CardContent className="p-0">
              <h4 className="font-semibold text-lg mb-2">Predicted material group</h4>
              <div className="text-3xl font-bold mb-4">{predictionData.materialGroup.predicted}</div>
              
              <div className="space-y-3">
                <div className="bg-white p-3 rounded">
                  <div className="text-sm text-gray-600 mb-1">F1 Score (of {predictionData.materialGroup.supports} supports)</div>
                  <div className="text-xl font-semibold text-teal-600">{predictionData.materialGroup.f1Score}%</div>
                  <ConfidenceIndicator confidence={predictionData.materialGroup.confidence} score={predictionData.materialGroup.f1Score} />
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 mb-2">Saved material group</div>
                  {isEditing.mg ? (
                    <div className="flex gap-2">
                      <Input 
                        value={savedMaterialGroup} 
                        onChange={(e) => setSavedMaterialGroup(e.target.value)}
                        className="w-20 h-8 text-sm"
                      />
                      <Button size="sm" onClick={() => handleSave('mg', savedMaterialGroup)}>
                        Update
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{savedMaterialGroup}</span>
                      <button 
                        onClick={() => setIsEditing(prev => ({ ...prev, mg: true }))}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ✏️
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* External Material Group Card */}
          <Card className="p-4 bg-amber-50 border-amber-200">
            <CardContent className="p-0">
              <h4 className="font-semibold text-lg mb-2">Predicted ext material group</h4>
              <div className="text-3xl font-bold mb-4">{predictionData.extMaterialGroup.predicted}</div>
              
              <div className="space-y-3">
                <div className="bg-white p-3 rounded">
                  <div className="text-sm text-gray-600 mb-1">F1 Score (of {predictionData.extMaterialGroup.supports} supports)</div>
                  <div className="text-xl font-semibold text-amber-600">{predictionData.extMaterialGroup.f1Score}%</div>
                  <ConfidenceIndicator confidence={predictionData.extMaterialGroup.confidence} score={predictionData.extMaterialGroup.f1Score} />
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 mb-2">Saved ext material group</div>
                  {isEditing.emg ? (
                    <div className="flex gap-2">
                      <Input 
                        value={savedExtMaterialGroup} 
                        onChange={(e) => setSavedExtMaterialGroup(e.target.value)}
                        className="w-20 h-8 text-sm"
                      />
                      <Button size="sm" onClick={() => handleSave('emg', savedExtMaterialGroup)}>
                        Update
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{savedExtMaterialGroup}</span>
                      <button 
                        onClick={() => setIsEditing(prev => ({ ...prev, emg: true }))}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ✏️
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end mt-6">
          <Button 
            onClick={onPredictAnother}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            ⚡ Predict for another material
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PredictionResults;
