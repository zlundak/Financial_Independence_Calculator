
import React from 'react';
import { Shield, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface RiskData {
  tolerance: 'conservative' | 'moderate' | 'aggressive';
  withdrawalRate: number;
  strategy: string;
}

interface RiskToleranceStepProps {
  data: RiskData;
  onUpdate: (data: RiskData) => void;
}

const withdrawalStrategies = [
  { 
    id: '4-percent', 
    name: '4% Rule (Fixed)', 
    rate: 4.0, 
    description: 'Withdraw 4% of initial portfolio, adjusted for inflation yearly' 
  },
  { 
    id: 'dynamic-35', 
    name: 'Dynamic 3.5%', 
    rate: 3.5, 
    description: 'Start at 3.5%, adjust based on market performance' 
  },
  { 
    id: 'dynamic-45', 
    name: 'Dynamic 4.5%', 
    rate: 4.5, 
    description: 'Higher initial rate with market-based adjustments' 
  },
  { 
    id: 'bond-tent', 
    name: 'Bond Tent Strategy', 
    rate: 4.0, 
    description: 'Increase bond allocation as you age, 4% withdrawal' 
  },
  { 
    id: 'guardrails', 
    name: 'Guardrails (3.5-5%)', 
    rate: 4.25, 
    description: 'Adjust spending based on portfolio performance guardrails' 
  },
];

const RiskToleranceStep: React.FC<RiskToleranceStepProps> = ({ data, onUpdate }) => {
  const handleToleranceChange = (tolerance: 'conservative' | 'moderate' | 'aggressive') => {
    // Suggest appropriate withdrawal rates based on risk tolerance
    let suggestedRate = data.withdrawalRate;
    if (tolerance === 'conservative' && data.withdrawalRate > 3.5) {
      suggestedRate = 3.5;
    } else if (tolerance === 'aggressive' && data.withdrawalRate < 4.0) {
      suggestedRate = 4.5;
    }
    
    onUpdate({ ...data, tolerance, withdrawalRate: suggestedRate });
  };

  const handleStrategyChange = (strategyId: string) => {
    const strategy = withdrawalStrategies.find(s => s.id === strategyId);
    if (strategy) {
      onUpdate({ 
        ...data, 
        strategy: strategy.name, 
        withdrawalRate: strategy.rate 
      });
    }
  };

  const currentStrategy = withdrawalStrategies.find(s => s.name === data.strategy) || withdrawalStrategies[0];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Shield className="h-12 w-12 text-blue-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Risk Tolerance & Withdrawal Strategy</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Your risk tolerance and withdrawal strategy significantly impact your required FI number. Conservative approaches need larger portfolios but provide more security.
        </p>
      </div>

      {/* Risk Tolerance Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span>Investment Risk Tolerance</span>
          </CardTitle>
          <CardDescription>
            How comfortable are you with market volatility in your portfolio?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={data.tolerance} 
            onValueChange={handleToleranceChange}
            className="space-y-4"
          >
            <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50">
              <RadioGroupItem value="conservative" id="conservative" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="conservative" className="font-medium cursor-pointer text-blue-600">
                  Conservative (Low Risk)
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  Priority on capital preservation. Heavy bond allocation (40-60%). Can handle minimal portfolio fluctuation.
                </p>
                <div className="text-xs text-gray-500 mt-2">
                  Typical allocation: 40-60% stocks, 40-60% bonds | Expected return: 5-7%
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50">
              <RadioGroupItem value="moderate" id="moderate" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="moderate" className="font-medium cursor-pointer text-green-600">
                  Moderate (Balanced Risk)
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  Balanced approach between growth and stability. Can handle moderate market swings.
                </p>
                <div className="text-xs text-gray-500 mt-2">
                  Typical allocation: 60-80% stocks, 20-40% bonds | Expected return: 6-8%
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50">
              <RadioGroupItem value="aggressive" id="aggressive" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="aggressive" className="font-medium cursor-pointer text-orange-600">
                  Aggressive (High Risk)
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  Growth-focused with high risk tolerance. Comfortable with significant market volatility for higher long-term returns.
                </p>
                <div className="text-xs text-gray-500 mt-2">
                  Typical allocation: 80-100% stocks, 0-20% bonds | Expected return: 7-10%
                </div>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Withdrawal Strategy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <span>Withdrawal Strategy</span>
          </CardTitle>
          <CardDescription>
            Choose how you plan to withdraw money from your portfolio in retirement
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="strategy">Withdrawal Strategy</Label>
            <Select 
              value={currentStrategy.id} 
              onValueChange={handleStrategyChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select withdrawal strategy" />
              </SelectTrigger>
              <SelectContent>
                {withdrawalStrategies.map((strategy) => (
                  <SelectItem key={strategy.id} value={strategy.id}>
                    {strategy.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-500 mt-2">
              {currentStrategy.description}
            </p>
          </div>

          {/* Custom Withdrawal Rate */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Withdrawal Rate</Label>
              <span className="text-lg font-semibold text-blue-600">
                {data.withdrawalRate.toFixed(1)}%
              </span>
            </div>
            
            <Slider
              value={[data.withdrawalRate]}
              onValueChange={([value]) => onUpdate({ ...data, withdrawalRate: value })}
              min={2.5}
              max={6.0}
              step={0.1}
              className="w-full"
            />
            
            <div className="flex justify-between text-xs text-gray-500">
              <span>2.5% (Very Conservative)</span>
              <span>6.0% (Very Aggressive)</span>
            </div>
          </div>

          {/* Withdrawal Rate Impact */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4 text-center border-blue-200 bg-blue-50">
              <div className="text-lg font-bold text-blue-600">
                {(25 / (data.withdrawalRate / 100)).toFixed(0)}x
              </div>
              <div className="text-sm text-gray-600">Portfolio Multiplier</div>
            </Card>
            
            <Card className="p-4 text-center border-green-200 bg-green-50">
              <div className="text-lg font-bold text-green-600">
                {(100 - (data.withdrawalRate * 2)).toFixed(0)}%
              </div>
              <div className="text-sm text-gray-600">30-Year Success Rate*</div>
            </Card>
            
            <Card className="p-4 text-center border-orange-200 bg-orange-50">
              <div className="text-lg font-bold text-orange-600">
                {data.withdrawalRate > 4.5 ? 'High' : data.withdrawalRate < 3.5 ? 'Low' : 'Medium'}
              </div>
              <div className="text-sm text-gray-600">Risk Level</div>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Strategy Summary */}
      <Card className="border-purple-200 bg-purple-50">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-purple-800 mb-4">Your Strategy Summary</h3>
            
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div>
                <h4 className="font-medium text-purple-700 mb-2">Risk Profile</h4>
                <p className="text-sm text-purple-600 capitalize">
                  <strong>{data.tolerance}</strong> risk tolerance
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-purple-700 mb-2">Withdrawal Plan</h4>
                <p className="text-sm text-purple-600">
                  <strong>{data.withdrawalRate}%</strong> using {data.strategy}
                </p>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-white rounded border border-purple-200">
              <p className="text-sm text-purple-700">
                With a {data.withdrawalRate}% withdrawal rate, you'll need approximately <strong>{(25 / (data.withdrawalRate / 100)).toFixed(1)}x</strong> your annual expenses in your portfolio.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskToleranceStep;
