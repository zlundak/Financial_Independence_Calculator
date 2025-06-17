
import React from 'react';
import { Banknote, Calendar, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface IncomeData {
  socialSecurity: number;
  pension: number;
  otherIncome: number;
  startAge: number;
}

interface IncomeStepProps {
  data: IncomeData;
  onUpdate: (data: IncomeData) => void;
}

const IncomeStep: React.FC<IncomeStepProps> = ({ data, onUpdate }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const totalMonthlyIncome = data.socialSecurity + data.pension + data.otherIncome;
  const totalAnnualIncome = totalMonthlyIncome * 12;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Banknote className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Non-Portfolio Income</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Income sources that don't come from your investment portfolio reduce your required FI number. Include Social Security, pensions, and other guaranteed income.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Social Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span>Social Security</span>
            </CardTitle>
            <CardDescription>
              Estimated monthly Social Security benefits. Check your SSA statement for projections.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="social-security">Monthly Social Security</Label>
              <Input
                id="social-security"
                type="number"
                value={data.socialSecurity}
                onChange={(e) => onUpdate({ 
                  ...data, 
                  socialSecurity: parseInt(e.target.value) || 0 
                })}
                placeholder="2500"
                min="0"
                step="100"
              />
            </div>
            
            <div>
              <Label htmlFor="start-age">Benefits Start Age</Label>
              <Select 
                value={data.startAge.toString()} 
                onValueChange={(value) => onUpdate({ ...data, startAge: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select age" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="62">62 (Early retirement - reduced benefits)</SelectItem>
                  <SelectItem value="67">67 (Full retirement age)</SelectItem>
                  <SelectItem value="70">70 (Delayed retirement - maximum benefits)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-center">
                <div className="text-lg font-semibold text-blue-600">
                  {formatCurrency(data.socialSecurity * 12)}
                </div>
                <div className="text-sm text-gray-600">Annual Social Security</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pension & Other Income */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-purple-600" />
              <span>Other Income Sources</span>
            </CardTitle>
            <CardDescription>
              Pensions, annuities, rental income, or other guaranteed sources
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="pension">Monthly Pension</Label>
              <Input
                id="pension"
                type="number"
                value={data.pension}
                onChange={(e) => onUpdate({ 
                  ...data, 
                  pension: parseInt(e.target.value) || 0 
                })}
                placeholder="1000"
                min="0"
                step="100"
              />
            </div>
            
            <div>
              <Label htmlFor="other-income">Other Monthly Income</Label>
              <Input
                id="other-income"
                type="number"
                value={data.otherIncome}
                onChange={(e) => onUpdate({ 
                  ...data, 
                  otherIncome: parseInt(e.target.value) || 0 
                })}
                placeholder="500"
                min="0"
                step="100"
              />
              <p className="text-sm text-gray-500 mt-1">
                Rental income, annuities, part-time work, etc.
              </p>
            </div>
            
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="text-center">
                <div className="text-lg font-semibold text-purple-600">
                  {formatCurrency((data.pension + data.otherIncome) * 12)}
                </div>
                <div className="text-sm text-gray-600">Annual Other Income</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Total Income Summary */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-green-800 mb-4">Total Non-Portfolio Income</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <div className="text-lg font-bold text-green-600">
                  {formatCurrency(data.socialSecurity)}
                </div>
                <div className="text-sm text-gray-600">Social Security/mo</div>
              </div>
              <div>
                <div className="text-lg font-bold text-green-600">
                  {formatCurrency(data.pension)}
                </div>
                <div className="text-sm text-gray-600">Pension/mo</div>
              </div>
              <div>
                <div className="text-lg font-bold text-green-600">
                  {formatCurrency(data.otherIncome)}
                </div>
                <div className="text-sm text-gray-600">Other/mo</div>
              </div>
              <div>
                <div className="text-lg font-bold text-green-600">
                  {formatCurrency(totalMonthlyIncome)}
                </div>
                <div className="text-sm text-gray-600">Total/mo</div>
              </div>
            </div>
            
            <div className="text-2xl font-bold text-green-700 mb-2">
              {formatCurrency(totalAnnualIncome)}
            </div>
            <div className="text-gray-600">
              Total Annual Non-Portfolio Income (starting at age {data.startAge})
            </div>
            
            {totalAnnualIncome > 0 && (
              <div className="mt-4 p-3 bg-white rounded border border-green-200">
                <p className="text-sm text-green-700">
                  💡 This income reduces your required portfolio size significantly! 
                  Every $1 of annual income is roughly equivalent to $25 less needed in your portfolio (using 4% rule).
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="pt-6">
          <h4 className="font-semibold text-yellow-800 mb-2">💡 Income Planning Tips</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Check your Social Security statement at ssa.gov for personalized estimates</li>
            <li>• Consider delaying Social Security to age 70 for 32% higher benefits</li>
            <li>• Include only guaranteed income sources - be conservative with estimates</li>
            <li>• Part-time work in early retirement can bridge the gap to Social Security age</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default IncomeStep;
