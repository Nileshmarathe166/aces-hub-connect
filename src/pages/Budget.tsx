
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowDown, ArrowUp, Coins, DollarSign, FileText, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock budget data
const budgetData = {
  totalBudget: 15000,
  allocated: 12500,
  spent: 9200,
  remaining: 5800,
  categories: [
    { name: 'Events', allocated: 7000, spent: 5200 },
    { name: 'Equipment', allocated: 3000, spent: 2800 },
    { name: 'Promotional', allocated: 1500, spent: 800 },
    { name: 'Miscellaneous', allocated: 1000, spent: 400 }
  ],
  recentTransactions: [
    { id: 1, description: 'Hackathon Prizes', amount: -1200, date: '2025-04-02', category: 'Events' },
    { id: 2, description: 'T-shirt Printing', amount: -800, date: '2025-03-28', category: 'Promotional' },
    { id: 3, description: 'Department Funding', amount: 5000, date: '2025-03-15', category: 'Income' },
    { id: 4, description: 'Projector Purchase', amount: -1500, date: '2025-03-10', category: 'Equipment' },
    { id: 5, description: 'Tech Talk Refreshments', amount: -350, date: '2025-03-05', category: 'Events' },
  ],
  monthlySpending: [
    { month: 'Jan', amount: 1200 },
    { month: 'Feb', amount: 1800 },
    { month: 'Mar', amount: 2400 },
    { month: 'Apr', amount: 3800 },
    { month: 'May', amount: 0 },
    { month: 'Jun', amount: 0 },
    { month: 'Jul', amount: 0 },
    { month: 'Aug', amount: 0 },
    { month: 'Sep', amount: 0 },
    { month: 'Oct', amount: 0 },
    { month: 'Nov', amount: 0 },
    { month: 'Dec', amount: 0 }
  ]
};

// Colors for charts
const COLORS = ['#8B5CF6', '#D946EF', '#0EA5E9', '#F97316'];

// Budget card component
const BudgetOverviewCard = () => {
  const percentSpent = Math.round((budgetData.spent / budgetData.totalBudget) * 100);
  
  return (
    <Card className="aces-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Budget Overview</CardTitle>
        <CardDescription>Academic Year 2024-2025</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span>Total Spent</span>
            <span>${budgetData.spent.toLocaleString()} / ${budgetData.totalBudget.toLocaleString()}</span>
          </div>
          <Progress value={percentSpent} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{percentSpent}% spent</span>
            <span>{100 - percentSpent}% remaining</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-green-800">Total Budget</p>
                <p className="text-2xl font-bold text-green-600">${budgetData.totalBudget.toLocaleString()}</p>
              </div>
              <div className="bg-green-200 p-2 rounded">
                <DollarSign className="h-5 w-5 text-green-700" />
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-blue-800">Remaining</p>
                <p className="text-2xl font-bold text-blue-600">${budgetData.remaining.toLocaleString()}</p>
              </div>
              <div className="bg-blue-200 p-2 rounded">
                <Coins className="h-5 w-5 text-blue-700" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Category spending component
const CategorySpendingCard = () => {
  const data = budgetData.categories.map((category) => ({
    name: category.name,
    allocated: category.allocated,
    spent: category.spent,
    remaining: category.allocated - category.spent,
  }));
  
  return (
    <Card className="aces-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Category Breakdown</CardTitle>
        <CardDescription>Budget allocation and spending by category</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value}`} />
              <Legend />
              <Bar dataKey="allocated" name="Allocated" fill="#8B5CF6" />
              <Bar dataKey="spent" name="Spent" fill="#D946EF" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="space-y-4 mt-8">
          {budgetData.categories.map((category, index) => {
            const percentSpent = Math.round((category.spent / category.allocated) * 100);
            return (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{category.name}</span>
                  <span>${category.spent.toLocaleString()} / ${category.allocated.toLocaleString()}</span>
                </div>
                <Progress value={percentSpent} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{percentSpent}% spent</span>
                  <span>${category.allocated - category.spent} remaining</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

// Monthly spending chart
const MonthlySpendingCard = () => {
  return (
    <Card className="aces-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Monthly Spending</CardTitle>
        <CardDescription>Track spending patterns over the academic year</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={budgetData.monthlySpending}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value}`} />
              <Bar dataKey="amount" name="Amount Spent" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

// Distribution pie chart
const BudgetDistributionCard = () => {
  const data = budgetData.categories.map((category) => ({
    name: category.name,
    value: category.allocated
  }));
  
  return (
    <Card className="aces-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Budget Distribution</CardTitle>
        <CardDescription>How the budget is allocated across categories</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8B5CF6"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

// Recent transactions table
const RecentTransactionsCard = () => {
  return (
    <Card className="aces-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">Recent Transactions</CardTitle>
            <CardDescription>Latest income and expenses</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {budgetData.recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded ${transaction.amount > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                  {transaction.amount > 0 ? (
                    <ArrowDown className="h-5 w-5 text-green-600" />
                  ) : (
                    <ArrowUp className="h-5 w-5 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()} • {transaction.category}
                  </p>
                </div>
              </div>
              <div className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD'
                })}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 flex justify-center">
          <Button variant="ghost" size="sm" className="text-aces-400">
            View All Transactions
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Add expense button
const AddExpenseButton = () => {
  return (
    <Button className="bg-aces-400 hover:bg-aces-500">
      <Plus className="h-4 w-4 mr-2" />
      Add Transaction
    </Button>
  );
};

const Budget = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Budget Management</h1>
          <p className="text-gray-500 mt-1">Track, plan, and manage ACES finances</p>
        </div>
        
        <AddExpenseButton />
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-0 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <BudgetOverviewCard />
            <div className="lg:col-span-3">
              <CategorySpendingCard />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MonthlySpendingCard />
            <BudgetDistributionCard />
          </div>
        </TabsContent>
        
        <TabsContent value="transactions" className="mt-0">
          <RecentTransactionsCard />
        </TabsContent>
        
        <TabsContent value="reports" className="mt-0">
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">Reports Coming Soon</h2>
            <p className="text-gray-500">This feature is currently under development.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Budget;
