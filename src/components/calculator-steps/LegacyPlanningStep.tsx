
import React from 'react';
import { Gift, Heart, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';

interface LegacyData {
  dieWithZero: boolean;
  legacyAmount: number;
  charitableGiving: number;
}

interface LegacyPlanningStepProps {
  data: LegacyData;
  onUpdate: (data: LegacyData) => void;
}

const LegacyPlanningStep: React.FC<LegacyPlanningStepProps> = ({ data, onUpdate }) => {
  const handleStrategyChange = (strategy: string) => {
    const dieWithZero = strategy === 'zero';
    onUpdate({ 
      ...data, 
      dieWithZero,
      legacyAmount: dieWithZero ? 0 : data.legacyAmount,
      charitableGiving: dieWithZero ? 0 : data.charitableGiving
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Gift className="h-12 w-12 text-purple-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Legacy Planning</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Decide whether you want to spend down your assets completely or leave money for family, charity, or other causes. This significantly impacts your required FI number.
        </p>
      </div>

      {/* Strategy Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Legacy Strategy</CardTitle>
          <CardDescription>
            Choose your approach to end-of-life financial planning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={data.dieWithZero ? 'zero' : 'legacy'} 
            onValueChange={handleStrategyChange}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
              <RadioGroupItem value="zero" id="zero" />
              <div className="flex-1">
                <Label htmlFor="zero" className="font-medium cursor-pointer">
                  Die with Zero Strategy
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  Spend down your wealth to near zero by end of life. Maximizes your lifetime spending power.
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
              <RadioGroupItem value="legacy" id="legacy" />
              <div className="flex-1">
                <Label htmlFor="legacy" className="font-medium cursor-pointer">
                  Leave a Legacy
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  Plan to leave money for family, charity, or other causes. Requires a higher FI number.
                </p>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Legacy Amount Configuration */}
      {!data.dieWithZero && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-500" />
                <span>Family Legacy</span>
              </CardTitle>
              <CardDescription>
                Amount you want to leave to family or heirs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="legacy-amount">Legacy Amount</Label>
                <Input
                  id="legacy-amount"
                  type="number"
                  value={data.legacyAmount}
                  onChange={(e) => onUpdate({ 
                    ...data, 
                    legacyAmount: parseInt(e.target.value) || 0 
                  })}
                  placeholder="500000"
                  min="0"
                  step="10000"
                />
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-semibold text-blue-600">
                    {formatCurrency(data.legacyAmount)}
                  </div>
                  <div className="text-sm text-gray-600">Target Legacy Amount</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-green-500" />
                <span>Charitable Giving</span>
              </CardTitle>
              <CardDescription>
                Amount planned for charitable donations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="charitable-giving">Charitable Amount</Label>
                <Input
                  id="charitable-giving"
                  type="number"
                  value={data.charitableGiving}
                  onChange={(e) => onUpdate({ 
                    ...data, 
                    charitableGiving: parseInt(e.target.value) || 0 
                  })}
                  placeholder="100000"
                  min="0"
                  step="5000"
                />
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-600">
                    {formatCurrency(data.charitableGiving)}
                  </div>
                  <div className="text-sm text-gray-600">Charitable Goal</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Summary */}
      <Card className={data.dieWithZero ? "border-orange-200 bg-orange-50" : "border-purple-200 bg-purple-50"}>
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="font-semibold text-lg mb-2">
              {data.dieWithZero ? "Die with Zero Strategy" : "Legacy Strategy"}
            </h3>
            {data.dieWithZero ? (
              <div className="text-orange-700">
                <p className="mb-2">You're planning to spend down your wealth completely.</p>
                <p className="text-sm">This typically reduces your required FI number by 20-40%.</p>
              </div>
            ) : (
              <div className="text-purple-700">
                <p className="mb-2">Total legacy goal: <strong>{formatCurrency(data.legacyAmount + data.charitableGiving)}</strong></p>
                <p className="text-sm">
                  Family: {formatCurrency(data.legacyAmount)} | 
                  Charity: {formatCurrency(data.charitableGiving)}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LegacyPlanningStep;
