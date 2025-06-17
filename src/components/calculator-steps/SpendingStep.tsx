
import React from 'react';
import { ShoppingCart, Calendar, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface SpendingData {
  currentAnnual: number;
  projections: {
    fifties: number;
    sixties: number;
    seventies: number;
    eighties: number;
  };
}

interface SpendingStepProps {
  data: SpendingData;
  onUpdate: (data: SpendingData) => void;
}

const SpendingStep: React.FC<SpendingStepProps> = ({ data, onUpdate }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const updateProjection = (decade: keyof typeof data.projections, percentage: number) => {
    onUpdate({
      ...data,
      projections: {
        ...data.projections,
        [decade]: percentage
      }
    });
  };

  const calculateDecadeSpending = (percentage: number) => {
    return (data.currentAnnual * percentage) / 100;
  };

  const decades = [
    {
      key: 'fifties' as const,
      label: '50s',
      description: 'Active retirement, travel, hobbies',
      icon: '🎯',
      color: 'blue'
    },
    {
      key: 'sixties' as const,
      label: '60s',
      description: 'Settling into retirement lifestyle',
      icon: '🌟',
      color: 'green'
    },
    {
      key: 'seventies' as const,
      label: '70s',
      description: 'Reduced travel, increased healthcare',
      icon: '🏡',
      color: 'orange'
    },
    {
      key: 'eighties' as const,
      label: '80s+',
      description: 'Lower activity, higher medical costs',
      icon: '🏥',
      color: 'red'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <ShoppingCart className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Spending Analysis</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Understanding how your spending will change over time is crucial for accurate FI planning. Most people spend differently in their 50s vs 80s.
        </p>
      </div>

      {/* Current Spending */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            <span>Current Annual Spending</span>
          </CardTitle>
          <CardDescription>
            Your current annual expenses (or desired FI lifestyle spending)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="current-spending">Annual Spending</Label>
              <Input
                id="current-spending"
                type="number"
                value={data.currentAnnual}
                onChange={(e) => onUpdate({ 
                  ...data, 
                  currentAnnual: parseInt(e.target.value) || 0 
                })}
                placeholder="75000"
                min="0"
                step="5000"
                className="text-lg font-semibold"
              />
              <p className="text-sm text-gray-500 mt-1">
                Include housing, food, transportation, entertainment, healthcare, etc.
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency(data.currentAnnual)}
                </div>
                <div className="text-sm text-gray-600">Baseline Annual Spending</div>
                <div className="text-sm text-gray-500 mt-1">
                  {formatCurrency(data.currentAnnual / 12)}/month
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Decade Projections */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingDown className="h-5 w-5 text-purple-600" />
            <span>Spending by Life Stage</span>
          </CardTitle>
          <CardDescription>
            Adjust your spending projections for different decades of retirement
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {decades.map((decade) => (
            <div key={decade.key} className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{decade.icon}</span>
                  <div>
                    <h4 className="font-medium">Your {decade.label}</h4>
                    <p className="text-sm text-gray-500">{decade.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">{data.projections[decade.key]}%</div>
                  <div className="text-sm text-gray-500">
                    {formatCurrency(calculateDecadeSpending(data.projections[decade.key]))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Slider
                  value={[data.projections[decade.key]]}
                  onValueChange={([value]) => updateProjection(decade.key, value)}
                  min={30}
                  max={150}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>30% of current</span>
                  <span>150% of current</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Spending Summary Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Spending Projection Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {decades.map((decade) => (
              <div key={decade.key} className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">{decade.icon}</div>
                <div className="font-medium text-gray-700">{decade.label}</div>
                <div className="text-lg font-bold text-blue-600">
                  {formatCurrency(calculateDecadeSpending(data.projections[decade.key]))}
                </div>
                <div className="text-sm text-gray-500">
                  {data.projections[decade.key]}% of current
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-700 mb-2">Average Annual Spending</h4>
            <div className="text-xl font-bold text-gray-800">
              {formatCurrency(Object.values(data.projections).reduce((sum, pct) => 
                sum + calculateDecadeSpending(pct), 0) / 4)}
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Weighted average across all decades
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Spending Tips */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="pt-6">
          <h4 className="font-semibold text-yellow-800 mb-3">💡 Spending Pattern Insights</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
            <div>
              <h5 className="font-medium mb-1">Common Early Retirement (50s-60s):</h5>
              <ul className="list-disc list-inside space-y-1">
                <li>Higher travel and activity costs</li>
                <li>Potential healthcare bridge insurance</li>
                <li>Home improvements, hobbies</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-1">Later Retirement (70s-80s):</h5>
              <ul className="list-disc list-inside space-y-1">
                <li>Reduced travel and entertainment</li>
                <li>Increased healthcare costs</li>
                <li>Potential long-term care needs</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpendingStep;
