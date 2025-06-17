
import React from 'react';
import { Target, Download, Share2, TrendingUp, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface CalculatorData {
  lifeExpectancy: {
    age: number;
    adjustedAge: number;
    healthFactors: string[];
  };
  legacy: {
    dieWithZero: boolean;
    legacyAmount: number;
    charitableGiving: number;
  };
  portfolio: {
    totalValue: number;
    assets: {
      stocks: number;
      bonds: number;
      realEstate: number;
      cash: number;
      other: number;
    };
  };
  income: {
    socialSecurity: number;
    pension: number;
    otherIncome: number;
    startAge: number;
  };
  risk: {
    tolerance: 'conservative' | 'moderate' | 'aggressive';
    withdrawalRate: number;
    strategy: string;
  };
  spending: {
    currentAnnual: number;
    projections: {
      fifties: number;
      sixties: number;
      seventies: number;
      eighties: number;
    };
  };
}

interface ResultsStepProps {
  data: CalculatorData;
}

const ResultsStep: React.FC<ResultsStepProps> = ({ data }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate the FI number
  const calculateFINumber = () => {
    // Average spending across decades
    const averageSpending = Object.values(data.spending.projections).reduce((sum, pct) => 
      sum + (data.spending.currentAnnual * pct / 100), 0) / 4;
    
    // Annual income starting at retirement age
    const annualIncome = (data.income.socialSecurity + data.income.pension + data.income.otherIncome) * 12;
    
    // Net spending that needs to come from portfolio
    const netSpending = Math.max(0, averageSpending - annualIncome);
    
    // Portfolio multiplier based on withdrawal rate
    const portfolioMultiplier = 100 / data.withdrawalRate;
    
    // Base FI number
    const baseFINumber = netSpending * portfolioMultiplier;
    
    // Add legacy amounts
    const legacyTotal = data.legacy.legacyAmount + data.legacy.charitableGiving;
    
    return baseFINumber + legacyTotal;
  };

  const fiNumber = calculateFINumber();
  const currentPortfolio = data.portfolio.totalValue;
  const progressPercentage = Math.min((currentPortfolio / fiNumber) * 100, 100);
  const remainingNeeded = Math.max(0, fiNumber - currentPortfolio);
  
  // Calculate timeline estimates
  const calculateTimeline = () => {
    if (remainingNeeded <= 0) return 0;
    
    // Assume 7% annual return and various savings rates
    const expectedReturn = 0.07;
    const currentAge = data.lifeExpectancy.age;
    
    // Simple compound growth calculation
    // Assuming continued contributions needed
    const yearsToFI = Math.log(fiNumber / currentPortfolio) / Math.log(1 + expectedReturn);
    
    return Math.max(0, Math.ceil(yearsToFI));
  };

  const yearsToFI = calculateTimeline();
  const fiAge = data.lifeExpectancy.age + yearsToFI;

  const handleExportPDF = () => {
    // Placeholder for PDF export functionality
    alert('PDF export feature coming soon!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My FI Number',
        text: `I calculated my Financial Independence number: ${formatCurrency(fiNumber)}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`My FI Number: ${formatCurrency(fiNumber)} - Calculate yours at ${window.location.href}`);
      alert('Results copied to clipboard!');
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Target className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Financial Independence Number</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Based on your inputs, here's your personalized FI number and progress toward financial independence.
        </p>
      </div>

      {/* Main FI Number Display */}
      <Card className="border-green-200 bg-gradient-to-br from-green-50 to-blue-50">
        <CardContent className="pt-8 pb-8">
          <div className="text-center">
            <div className="text-5xl font-bold text-green-600 mb-2">
              {formatCurrency(fiNumber)}
            </div>
            <div className="text-xl text-gray-600 mb-6">Your FI Number</div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency(currentPortfolio)}
                </div>
                <div className="text-sm text-gray-600">Current Portfolio</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {formatCurrency(remainingNeeded)}
                </div>
                <div className="text-sm text-gray-600">Still Needed</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {yearsToFI > 0 ? `${yearsToFI} years` : 'Achieved!'}
                </div>
                <div className="text-sm text-gray-600">
                  {yearsToFI > 0 ? `Est. FI Age: ${fiAge}` : 'You\'re FI ready!'}
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Progress to FI</span>
                <span>{progressPercentage.toFixed(1)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-4" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Breakdown Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Calculation Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span>Calculation Breakdown</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Average Annual Spending:</span>
                <span className="font-semibold">
                  {formatCurrency(Object.values(data.spending.projections).reduce((sum, pct) => 
                    sum + (data.spending.currentAnnual * pct / 100), 0) / 4)}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Less: Annual Income:</span>
                <span className="font-semibold text-green-600">
                  -{formatCurrency((data.income.socialSecurity + data.income.pension + data.income.otherIncome) * 12)}
                </span>
              </div>
              
              <div className="flex justify-between border-t pt-2">
                <span className="text-gray-600">Net Portfolio Need:</span>
                <span className="font-semibold">
                  {formatCurrency(Math.max(0, Object.values(data.spending.projections).reduce((sum, pct) => 
                    sum + (data.spending.currentAnnual * pct / 100), 0) / 4 - (data.income.socialSecurity + data.income.pension + data.income.otherIncome) * 12))}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Withdrawal Multiplier:</span>
                <span className="font-semibold">{(100 / data.risk.withdrawalRate).toFixed(1)}x</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Legacy Goals:</span>
                <span className="font-semibold">
                  {formatCurrency(data.legacy.legacyAmount + data.legacy.charitableGiving)}
                </span>
              </div>
              
              <div className="flex justify-between border-t pt-2 text-lg font-bold">
                <span>Total FI Number:</span>
                <span className="text-green-600">{formatCurrency(fiNumber)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Assumptions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              <span>Key Assumptions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Withdrawal Rate:</span>
                <span className="font-semibold">{data.risk.withdrawalRate}%</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Risk Tolerance:</span>
                <span className="font-semibold capitalize">{data.risk.tolerance}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Life Expectancy:</span>
                <span className="font-semibold">{data.lifeExpectancy.adjustedAge} years</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Income Starts:</span>
                <span className="font-semibold">Age {data.income.startAge}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Strategy:</span>
                <span className="font-semibold">{data.legacy.dieWithZero ? 'Die with Zero' : 'Leave Legacy'}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          onClick={handleExportPDF}
          className="flex items-center space-x-2"
          variant="outline"
        >
          <Download className="h-4 w-4" />
          <span>Export PDF Report</span>
        </Button>
        
        <Button 
          onClick={handleShare}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
        >
          <Share2 className="h-4 w-4" />
          <span>Share Results</span>
        </Button>
      </div>

      {/* Next Steps */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">🎯 Your Next Steps</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-blue-700 mb-2">If you're behind target:</h4>
              <ul className="text-sm text-blue-600 space-y-1 list-disc list-inside">
                <li>Increase savings rate</li>
                <li>Reduce current spending</li>
                <li>Consider working longer</li>
                <li>Optimize investment allocation</li>
                <li>Plan for part-time income in early retirement</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-blue-700 mb-2">If you're on track:</h4>
              <ul className="text-sm text-blue-600 space-y-1 list-disc list-inside">
                <li>Stay the course with your plan</li>
                <li>Review annually and adjust</li>
                <li>Consider tax optimization strategies</li>
                <li>Plan your retirement transition</li>
                <li>Think about your legacy goals</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="pt-6">
          <p className="text-sm text-yellow-700">
            <strong>Important:</strong> This calculator provides estimates based on your inputs and common FI principles. 
            Actual results may vary due to market conditions, inflation, tax changes, and life circumstances. 
            Consider consulting with a financial advisor for personalized advice.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsStep;
