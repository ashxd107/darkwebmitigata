import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Credentials", value: 8, color: "hsl(0, 84%, 60%)" },
  { name: "Personal Info", value: 6, color: "hsl(25, 90%, 55%)" },
  { name: "Device Data", value: 5, color: "hsl(38, 92%, 50%)" },
  { name: "Session Data", value: 5, color: "hsl(155, 96%, 44%)" },
];

const total = data.reduce((s, d) => s + d.value, 0);

const ExposureBreakdownChart = () => {
  return (
    <div className="card-surface !p-5 h-full">
      <h3 className="text-display text-sm mb-4">Exposure Breakdown</h3>
      <div className="flex items-center gap-5">
        <div className="w-[100px] h-[100px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={46}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-2.5">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-body text-[11px]">{item.name}</span>
              </div>
              <span className="text-display text-[11px]">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExposureBreakdownChart;
