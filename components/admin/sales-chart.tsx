'use client';

import { mockAnalytics, formatPrice } from '@/lib/mock-data';
// Auth-aware Sales Chart component
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { motion } from 'framer-motion';
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
        <div className="glass-card rounded-xl border border-primary/20 p-4 shadow-xl">
          <p className="mb-2 font-semibold text-foreground">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm text-muted-foreground">
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
    { icon: Calendar, label: 'Total da Semana', value: formatPrice(totalRevenue) },
    { icon: TrendingUp, label: 'Vendas Totais', value: totalSales.toString() },
    { icon: Target, label: 'Média/Dia', value: formatPrice(avgRevenue) },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Receita por Mês</h3>
        <p className="text-sm text-muted-foreground">Acompanhe o desempenho de vendas mensal</p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
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
              tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
              tickFormatter={(value) => `R$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#10b981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Summary */}
      <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border/30 pt-6">
        {summaryItems.map((item, index) => (
          <motion.div 
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="flex flex-col items-center gap-2 text-center"
          >
            <div className="rounded-lg bg-primary/10 p-2">
              <item.icon className="h-4 w-4 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className="text-lg font-bold text-foreground">{item.value}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
