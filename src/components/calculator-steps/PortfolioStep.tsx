
import React from 'react';
import { PieChart, DollarSign, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface PortfolioData {
  totalValue: number;
  assets: {
    stocks: number;
    bonds: number;
    realEstate: number;
    cash: number;
    other: number;
  };
}

interface PortfolioStepProps {
  data: PortfolioData;
  onUpdate: (data: PortfolioData) => void;
}

const PortfolioStep: React.FC<PortfolioStepProps> = ({ data, onUpdate }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const updateAssetAllocation = (assetType: keyof typeof data.assets, value: number) => {
    const newAssets = { ...data.assets, [assetType]: value };
    
    // Ensure allocations sum to 100%
    const total = Object.values(newAssets).reduce((sum, val) => sum + val, 0);
    if (total <= 100) {
      onUpdate({ ...data, assets: newAssets });
    }
  };

  const totalAllocation = Object.values(data.assets).reduce((sum, val) => sum + val, 0);

  const assetCategories = [
    { 
      key: 'stocks' as const, 
      label: 'Stocks/Equity', 
      color: 'bg-blue-500', 
      description: 'Individual stocks, mutual funds, ETFs' 
    },
    { 
      key: 'bonds' as const, 
      label: 'Bonds/Fixed Income', 
      color: 'bg-green-500', 
      description: 'Government and corporate bonds' 
    },
    { 
      key: 'realEstate' as const, 
      label: 'Real Estate', 
      color: 'bg-purple-500', 
      description: 'REITs, rental properties, primary residence equity' 
    },
    { 
      key: 'cash' as const, 
      label: 'Cash/Savings', 
      color: 'bg-yellow-500', 
      description: 'Bank accounts, CDs, money market' 
    },
    { 
      key: 'other' as const, 
      label: 'Other Assets', 
      color: 'bg-gray-500', 
      description: 'Commodities, crypto, business equity' 
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <PieChart className="h-12 w-12 text-blue-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Current Portfolio</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Tell us about your current assets and how they're allocated. This helps us understand your starting point and optimal investment strategy.
        </p>
      </div>

      {/* Total Portfolio Value */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span>Total Portfolio Value</span>
          </CardTitle>
          <CardDescription>
            Sum of all your investable assets (exclude primary residence unless you plan to downsize)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="portfolio-value">Current Portfolio Value</Label>
              <Input
                id="portfolio-value"
                type="number"
                value={data.totalValue}
                onChange={(e) => onUpdate({ 
                  ...data, 
                  totalValue: parseInt(e.target.value) || 0 
                })}
                placeholder="500000"
                min="0"
                step="10000"
                className="text-lg font-semibold"
              />
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(data.totalValue)}
                </div>
                <div className="text-sm text-gray-600">Current Net Worth</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Asset Allocation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <span>Asset Allocation</span>
          </CardTitle>
          <CardDescription>
            How is your portfolio currently distributed? (Must total 100%)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {assetCategories.map((category) => (
              <div key={category.key} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <Label className="font-medium">{category.label}</Label>
                    <p className="text-sm text-gray-500">{category.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-semibold">{data.assets[category.key]}%</span>
                    <div className="text-sm text-gray-500">
                      {formatCurrency((data.totalValue * data.assets[category.key]) / 100)}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Slider
                    value={[data.assets[category.key]]}
                    onValueChange={([value]) => updateAssetAllocation(category.key, value)}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Allocation Summary */}
            <div className={`p-4 rounded-lg ${
              totalAllocation === 100 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
            } border`}>
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Allocation:</span>
                <span className={`text-lg font-bold ${
                  totalAllocation === 100 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {totalAllocation}%
                </span>
              </div>
              {totalAllocation !== 100 && (
                <p className="text-sm text-red-600 mt-1">
                  Allocation must equal 100%. Adjust the sliders above.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {assetCategories.map((category) => (
              <div key={category.key} className="text-center">
                <div className={`w-16 h-16 ${category.color} rounded-full mx-auto mb-2 flex items-center justify-center`}>
                  <span className="text-white font-bold">{data.assets[category.key]}%</span>
                </div>
                <div className="text-sm font-medium">{category.label}</div>
                <div className="text-xs text-gray-500">
                  {formatCurrency((data.totalValue * data.assets[category.key]) / 100)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioStep;
