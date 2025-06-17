
import React, { useState } from 'react';
import { Calculator, TrendingUp, PiggyBank, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import FICalculator from '@/components/FICalculator';

const Index = () => {
  const [showCalculator, setShowCalculator] = useState(false);

  if (showCalculator) {
    return <FICalculator onBack={() => setShowCalculator(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-4 rounded-full">
              <Calculator className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-6">
            Financial Independence Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover "your number" for financial independence and retirement. Our comprehensive calculator helps you plan your path to FI with personalized projections, risk assessment, and spending analysis.
          </p>
          <Button 
            onClick={() => setShowCalculator(true)}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Your FI Journey
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <TrendingUp className="h-10 w-10 text-blue-600" />
              </div>
              <CardTitle className="text-xl font-semibold">Smart Projections</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Advanced calculations considering life expectancy, inflation, market volatility, and various withdrawal strategies.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <PiggyBank className="h-10 w-10 text-green-600" />
              </div>
              <CardTitle className="text-xl font-semibold">Comprehensive Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Factor in all income sources, asset allocation, spending patterns, and legacy planning for complete FI planning.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Target className="h-10 w-10 text-purple-600" />
              </div>
              <CardTitle className="text-xl font-semibold">Your Personal Number</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Get your personalized FI number with detailed breakdown and actionable steps to achieve your goals.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Key Questions Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Key Questions We'll Help You Answer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-gray-700">How long will you likely live, and how does this affect your planning?</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-gray-700">Should you plan to "die with zero" or leave a legacy?</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-gray-700">What's your current financial position and asset allocation?</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <p className="text-gray-700">What non-portfolio income can you expect (Social Security, pensions)?</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <p className="text-gray-700">What's your risk tolerance and optimal withdrawal strategy?</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <p className="text-gray-700">How will your spending change over different life stages?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
