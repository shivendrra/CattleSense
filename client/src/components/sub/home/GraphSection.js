import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

export default function GraphSection({ lineData, barData, lineConfig, barConfig }) {
  const defaultLineData = [
    { month: 'Jan', value: 12 }, { month: 'Feb', value: 15 }, { month: 'Mar', value: 8 },
    { month: 'Apr', value: 22 }, { month: 'May', value: 18 }, { month: 'Jun', value: 25 },
    { month: 'Jul', value: 20 }, { month: 'Aug', value: 16 }, { month: 'Sep', value: 14 },
    { month: 'Oct', value: 19 }, { month: 'Nov', value: 23 }, { month: 'Dec', value: 17 }
  ];

  const defaultBarData = [
    { month: 'Jan', value: 95 }, { month: 'Feb', value: 92 }, { month: 'Mar', value: 98 },
    { month: 'Apr', value: 89 }, { month: 'May', value: 96 }, { month: 'Jun', value: 94 },
    { month: 'Jul', value: 97 }, { month: 'Aug', value: 91 }, { month: 'Sep', value: 93 },
    { month: 'Oct', value: 95 }, { month: 'Nov', value: 98 }, { month: 'Dec', value: 96 }
  ];

  const defaultLineConfig = {
    title: 'AMU Trends',
    subtitle: 'Last 12 Months',
    icon: 'trending_up',
    color: '#B45253',
    gradientColor: 'rgba(180, 82, 83, 0.1)',
    yAxisMax: 30
  };

  const defaultBarConfig = {
    title: 'MRL Compliance Rate',
    subtitle: 'Monthly Performance',
    icon: 'verified',
    color: '#B45253',
    barColor: '#F6EFD2',
    yAxisMax: 100
  };

  const lineChartData = lineData || defaultLineData;
  const barChartData = barData || defaultBarData;
  const lineSettings = { ...defaultLineConfig, ...lineConfig };
  const barSettings = { ...defaultBarConfig, ...barConfig };

  const CustomTooltip = ({ active, payload, label, config }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'white',
          border: `2px solid ${config.color}`,
          borderRadius: '0',
          padding: '12px 16px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          fontSize: '13px',
          fontWeight: '500'
        }}>
          <p style={{ margin: '0 0 4px 0', color: '#333', fontWeight: '600' }}>{`${label}`}</p>
          <p style={{ margin: '0', color: config.color }}>
            {`${payload[0].value}${config.yAxisMax === 100 ? '%' : ''}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="row g-3 mb-3">
      <div className="col-lg-6">
        <div className="chart-card h-100">
          <div className="chart-header">
            <h4>
              <span className="material-symbols-outlined">{lineSettings.icon}</span>
              {lineSettings.title}
            </h4>
            <span className="chart-subtitle">{lineSettings.subtitle}</span>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={lineChartData} margin={{ top: 20, right: 20, left: 10, bottom: 10 }}>
                <defs>
                  <linearGradient id="amuGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={lineSettings.color} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={lineSettings.color} stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8e8e8" strokeWidth={1} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                  dy={10}
                />
                <YAxis 
                  domain={[0, lineSettings.yAxisMax]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                  dx={-10}
                />
                <Tooltip content={<CustomTooltip config={lineSettings} />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={lineSettings.color}
                  strokeWidth={3}
                  fill="url(#amuGradient)"
                  dot={{ fill: lineSettings.color, strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7, fill: lineSettings.color, strokeWidth: 2, stroke: 'white' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="col-lg-6">
        <div className="chart-card h-100">
          <div className="chart-header">
            <h4>
              <span className="material-symbols-outlined">{barSettings.icon}</span>
              {barSettings.title}
            </h4>
            <span className="chart-subtitle">{barSettings.subtitle}</span>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={barChartData} margin={{ top: 20, right: 20, left: 10, bottom: 10 }}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={barSettings.color} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={barSettings.barColor} stopOpacity={0.9}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8e8e8" strokeWidth={1} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                  dy={10}
                />
                <YAxis 
                  domain={[0, barSettings.yAxisMax]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                  dx={-10}
                />
                <Tooltip content={<CustomTooltip config={barSettings} />} />
                <Bar 
                  dataKey="value" 
                  fill="url(#barGradient)"
                  radius={[4, 4, 0, 0]}
                  stroke={barSettings.color}
                  strokeWidth={1}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}