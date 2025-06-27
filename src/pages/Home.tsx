
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Predictive material analysis</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div>
            <h2 className="text-4xl font-bold text-blue-600 mb-4">
              Let AI do the heavy lifting!
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Smart Predictions for P-Code, Material Group & External material groups. 
              Say goodbye to spreadsheets and manual lookups!
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-gray-700">Our AI-powered engine helps you quickly predict and validate:</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-700">P-Codes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-700">Material Groups</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-700">External Material Groups</span>
              </div>
            </div>
          </div>

          <p className="text-gray-600">
            Whether it's one material or a hundred, just upload the file or provide material name 
            and watch the magic happen. You'll get intelligent suggestions, side-by-side comparisons, 
            and the option to edit before saving.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-80 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
            <div className="relative z-10 text-center">
              <div className="w-20 h-20 bg-gray-800 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <div className="text-white text-2xl">🤖</div>
              </div>
              <div className="space-y-2">
                <div className="w-16 h-2 bg-blue-400 rounded mx-auto"></div>
                <div className="w-12 h-2 bg-purple-400 rounded mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <CardContent className="p-0">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Individual material analysis</h3>
            <p className="text-gray-600 mb-4">
              Get AI-powered predictions for your specific material.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Simply enter the material name and its details to receive an instant AI analysis.
            </p>
            <Button 
              onClick={() => navigate('/individual-analysis')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              ⚡ Start prediction
            </Button>
          </CardContent>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <CardContent className="p-0">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Comprehensive material analysis</h3>
            <p className="text-gray-600 mb-4">
              Get prediction analysis by uploading or selecting source file
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Simply upload or select your saved file to receive a detailed, real-time AI analysis.
            </p>
            <Button 
              onClick={() => navigate('/comprehensive-analysis')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              ⚡ Start prediction
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
