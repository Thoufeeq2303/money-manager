import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function SummaryChart({ summary }) {

  const data = summary.map(s => ({
    name: s._id,
    total: s.total
  }));

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-lg font-semibold mb-3">Income vs Expense</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
