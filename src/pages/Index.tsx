
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
    <div className="min-h-screen bg-gradient-to-br from-barrett-accent via-white to-barrett-tertiary/20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          {/* Barrett FP Branding */}
          <div className="flex justify-center mb-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-barrett-primary to-barrett-secondary p-4 rounded-full mb-4 inline-block">
                <Calculator className="h-12 w-12 text-white" />
              </div>
              <div className="text-barrett-primary font-source font-semibold text-lg tracking-wide">
                BARRETTPLANNING.com
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl font-bold font-source bg-gradient-to-r from-barrett-primary to-barrett-secondary bg-clip-text text-transparent mb-6">
            Financial Independence Calculator
          </h1>
          <p className="text-xl text-barrett-primary/80 max-w-3xl mx-auto mb-8 font-source">
            Discover "your number" for financial independence and retirement. Our comprehensive calculator helps you plan your path to FI with personalized projections, risk assessment, and spending analysis.
          </p>
          <Button 
            onClick={() => setShowCalculator(true)}
            size="lg"
            className="bg-gradient-to-r from-barrett-primary to-barrett-secondary hover:from-barrett-primary/90 hover:to-barrett-secondary/90 text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-source font-semibold"
          >
            Start Your FI Journey
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-barrett-primary/10 p-3 rounded-full">
                  <TrendingUp className="h-10 w-10 text-barrett-primary" />
                </div>
              </div>
              <CardTitle className="text-xl font-semibold font-source text-barrett-primary">Smart Projections</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center font-source text-barrett-primary/70">
                Advanced calculations considering life expectancy, inflation, market volatility, and various withdrawal strategies.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-barrett-secondary/10 p-3 rounded-full">
                  <PiggyBank className="h-10 w-10 text-barrett-secondary" />
                </div>
              </div>
              <CardTitle className="text-xl font-semibold font-source text-barrett-primary">Comprehensive Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center font-source text-barrett-primary/70">
                Factor in all income sources, asset allocation, spending patterns, and legacy planning for complete FI planning.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-barrett-tertiary/20 p-3 rounded-full">
                  <Target className="h-10 w-10 text-barrett-tertiary" />
                </div>
              </div>
              <CardTitle className="text-xl font-semibold font-source text-barrett-primary">Your Personal Number</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center font-source text-barrett-primary/70">
                Get your personalized FI number with detailed breakdown and actionable steps to achieve your goals.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Key Questions Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-16 border border-barrett-accent">
          <h2 className="text-3xl font-bold text-center mb-8 text-barrett-primary font-source">Key Questions We'll Help You Answer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-barrett-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-barrett-primary/80 font-source">How long will you likely live, and how does this affect your planning?</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-barrett-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-barrett-primary/80 font-source">Should you plan to "die with zero" or leave a legacy?</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-barrett-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-barrett-primary/80 font-source">What's your current financial position and asset allocation?</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-barrett-secondary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-barrett-primary/80 font-source">What non-portfolio income can you expect (Social Security, pensions)?</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-barrett-secondary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-barrett-primary/80 font-source">What's your risk tolerance and optimal withdrawal strategy?</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-barrett-secondary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-barrett-primary/80 font-source">How will your spending change over different life stages?</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Branding */}
        <div className="text-center py-8">
          <div className="text-barrett-primary/60 font-source text-sm">
            Powered by Barrett Financial Planning
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
