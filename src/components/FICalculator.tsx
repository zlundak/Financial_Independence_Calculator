
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import LifeExpectancyStep from './calculator-steps/LifeExpectancyStep';
import LegacyPlanningStep from './calculator-steps/LegacyPlanningStep';
import PortfolioStep from './calculator-steps/PortfolioStep';
import IncomeStep from './calculator-steps/IncomeStep';
import RiskToleranceStep from './calculator-steps/RiskToleranceStep';
import SpendingStep from './calculator-steps/SpendingStep';
import ResultsStep from './calculator-steps/ResultsStep';

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

const steps = [
  { id: 1, title: 'Life Expectancy', description: 'Estimate your lifespan' },
  { id: 2, title: 'Legacy Planning', description: 'End-of-life financial goals' },
  { id: 3, title: 'Current Portfolio', description: 'Your assets today' },
  { id: 4, title: 'Future Income', description: 'Non-portfolio income sources' },
  { id: 5, title: 'Risk & Withdrawal', description: 'Investment strategy' },
  { id: 6, title: 'Spending Analysis', description: 'Lifestyle projections' },
  { id: 7, title: 'Your Results', description: 'Your FI number' },
];

interface FICalculatorProps {
  onBack: () => void;
}

const FICalculator: React.FC<FICalculatorProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<CalculatorData>({
    lifeExpectancy: {
      age: 25,
      adjustedAge: 85,
      healthFactors: [],
    },
    legacy: {
      dieWithZero: false,
      legacyAmount: 0,
      charitableGiving: 0,
    },
    portfolio: {
      totalValue: 100000,
      assets: {
        stocks: 70,
        bonds: 20,
        realEstate: 5,
        cash: 3,
        other: 2,
      },
    },
    income: {
      socialSecurity: 2000,
      pension: 0,
      otherIncome: 0,
      startAge: 67,
    },
    risk: {
      tolerance: 'moderate',
      withdrawalRate: 4,
      strategy: '4% Rule',
    },
    spending: {
      currentAnnual: 50000,
      projections: {
        fifties: 100,
        sixties: 90,
        seventies: 80,
        eighties: 70,
      },
    },
  });

  const progress = (currentStep / steps.length) * 100;

  const updateData = (stepData: Partial<CalculatorData>) => {
    setData(prev => ({ ...prev, ...stepData }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <LifeExpectancyStep data={data.lifeExpectancy} onUpdate={(data) => updateData({ lifeExpectancy: data })} />;
      case 2:
        return <LegacyPlanningStep data={data.legacy} onUpdate={(data) => updateData({ legacy: data })} />;
      case 3:
        return <PortfolioStep data={data.portfolio} onUpdate={(data) => updateData({ portfolio: data })} />;
      case 4:
        return <IncomeStep data={data.income} onUpdate={(data) => updateData({ income: data })} />;
      case 5:
        return <RiskToleranceStep data={data.risk} onUpdate={(data) => updateData({ risk: data })} />;
      case 6:
        return <SpendingStep data={data.spending} onUpdate={(data) => updateData({ spending: data })} />;
      case 7:
        return <ResultsStep data={data} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">FI Calculator</h1>
            <div className="w-24"></div>
          </div>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Step {currentStep} of {steps.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-4 overflow-x-auto">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex flex-col items-center min-w-0 ${
                    step.id === currentStep ? 'text-blue-600' : 
                    step.id < currentStep ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step.id === currentStep ? 'bg-blue-600 text-white' :
                      step.id < currentStep ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {step.id}
                    </div>
                    <div className="text-center mt-2">
                      <div className="font-medium text-xs">{step.title}</div>
                      <div className="text-xs text-gray-500 hidden sm:block">{step.description}</div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-gray-300 mx-2 hidden sm:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {renderStep()}
          </div>
          
          {/* Navigation */}
          {currentStep < steps.length && (
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>
              
              <Button
                onClick={nextStep}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
              >
                <span>Next Step</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FICalculator;
