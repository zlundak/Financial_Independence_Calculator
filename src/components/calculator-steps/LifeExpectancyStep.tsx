
import React from 'react';
import { Heart, Activity, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

interface LifeExpectancyData {
  age: number;
  adjustedAge: number;
  healthFactors: string[];
}

interface LifeExpectancyStepProps {
  data: LifeExpectancyData;
  onUpdate: (data: LifeExpectancyData) => void;
}

const healthFactors = [
  { id: 'exercise', label: 'Regular Exercise (3+ times/week)', adjustment: +3 },
  { id: 'nonsmoker', label: 'Non-smoker', adjustment: +5 },
  { id: 'healthy-diet', label: 'Healthy Diet', adjustment: +2 },
  { id: 'family-longevity', label: 'Family History of Longevity', adjustment: +4 },
  { id: 'stress-management', label: 'Good Stress Management', adjustment: +2 },
  { id: 'social-connections', label: 'Strong Social Connections', adjustment: +3 },
  { id: 'preventive-care', label: 'Regular Preventive Healthcare', adjustment: +2 },
];

const LifeExpectancyStep: React.FC<LifeExpectancyStepProps> = ({ data, onUpdate }) => {
  const baseLifeExpectancy = 82; // Average life expectancy

  const handleAgeChange = (age: number) => {
    const adjustments = data.healthFactors.reduce((total, factorId) => {
      const factor = healthFactors.find(f => f.id === factorId);
      return total + (factor?.adjustment || 0);
    }, 0);
    
    const adjustedAge = Math.max(baseLifeExpectancy + adjustments, age + 10);
    onUpdate({ ...data, age, adjustedAge });
  };

  const handleHealthFactorChange = (factorId: string, checked: boolean) => {
    let newFactors;
    if (checked) {
      newFactors = [...data.healthFactors, factorId];
    } else {
      newFactors = data.healthFactors.filter(id => id !== factorId);
    }
    
    const adjustments = newFactors.reduce((total, factorId) => {
      const factor = healthFactors.find(f => f.id === factorId);
      return total + (factor?.adjustment || 0);
    }, 0);
    
    const adjustedAge = Math.max(baseLifeExpectancy + adjustments, data.age + 10);
    onUpdate({ ...data, healthFactors: newFactors, adjustedAge });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Life Expectancy Planning</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Understanding your life expectancy helps us calculate how long your money needs to last. We'll adjust based on your health and lifestyle factors.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Current Age Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <span>Your Current Age</span>
            </CardTitle>
            <CardDescription>
              Enter your current age to establish the planning timeline
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="age">Current Age</Label>
              <Input
                id="age"
                type="number"
                value={data.age}
                onChange={(e) => handleAgeChange(parseInt(e.target.value) || 25)}
                min="18"
                max="100"
                className="text-lg font-semibold"
              />
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{data.adjustedAge}</div>
                <div className="text-sm text-gray-600">Estimated Life Expectancy</div>
                <div className="text-sm text-gray-500 mt-1">
                  {data.adjustedAge - data.age} years of retirement planning
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Health Factors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span>Health & Lifestyle Factors</span>
            </CardTitle>
            <CardDescription>
              Select factors that may positively impact your longevity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {healthFactors.map((factor) => (
                <div key={factor.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={factor.id}
                      checked={data.healthFactors.includes(factor.id)}
                      onCheckedChange={(checked) => 
                        handleHealthFactorChange(factor.id, checked as boolean)
                      }
                    />
                    <Label 
                      htmlFor={factor.id}
                      className="text-sm cursor-pointer"
                    >
                      {factor.label}
                    </Label>
                  </div>
                  <span className="text-sm text-green-600 font-medium">
                    +{factor.adjustment} years
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <div className="text-sm text-gray-600">
                <strong>Total Adjustment:</strong> +{data.healthFactors.reduce((total, factorId) => {
                  const factor = healthFactors.find(f => f.id === factorId);
                  return total + (factor?.adjustment || 0);
                }, 0)} years
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
            <div>
              <h4 className="font-semibold text-yellow-800 mb-1">Planning Note</h4>
              <p className="text-sm text-yellow-700">
                This is an estimate based on general health factors. For more precise planning, consult with healthcare professionals. We recommend planning for a longer lifespan to ensure financial security.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LifeExpectancyStep;
