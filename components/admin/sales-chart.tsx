'use client';

import { mockAnalytics, formatPrice } from '@/lib/mock-data';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { TrendingUp, Calendar, Target } from 'lucide-react';

export function SalesChart() {
  const data = mockAnalytics.revenueByMonth;
  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);
  const totalSales = data.reduce((sum, d) => sum + d.sales, 0);
  const avgRevenue = totalRevenue / data.length;

  const CustomTooltip = ({ active, payload, label }: { 
    active?: boolean; 
    payload?: Array<{ value: number; dataKey: string }>; 
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-3 shadow-xl">
          <p className="mb-1 font-medium text-white">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm text-zinc-400">
              {entry.dataKey === 'revenue' 
                ? `Receita: ${formatPrice(entry.value)}`
                : `Vendas: ${entry.value}`
              }
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const summaryItems = [
    { icon: Calendar, label: 'Total do Periodo', value: formatPrice(totalRevenue) },
    { icon: TrendingUp, label: 'Vendas Totais', value: totalSales.toString() },
    { icon: Target, label: 'Media/Mes', value: formatPrice(avgRevenue) },
  ];

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white">Receita Recorrente (MRR)</h3>
        <p className="text-sm text-zinc-500">Acompanhe o desempenho de vendas mensal</p>
      </div>
      
      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="rgba(255,255,255,0.05)" 
              vertical={false}
            />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#71717a', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#71717a', fontSize: 12 }}
              tickFormatter={(value) => `R$${(value / 1000).toFixed(0)}k`}
              width={60}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#10b981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Summary */}
      <div className="mt-6 grid grid-cols-3 gap-4 border-t border-zinc-800 pt-6">
        {summaryItems.map((item) => (
          <div 
            key={item.label}
            className="flex flex-col items-center gap-2 text-center"
          >
            <div className="rounded-lg bg-zinc-800 p-2">
              <item.icon className="h-4 w-4 text-emerald-400" />
            </div>
            <p className="text-xs text-zinc-500">{item.label}</p>
            <p className="text-lg font-bold text-white">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
