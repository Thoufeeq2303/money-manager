import { useEffect, useState } from "react";
import { API } from "../api";
import AddTransactionModal from "./AddTransactionModal";
import TransactionList from "./TransactionList";
import SummaryChart from "./SummaryChart";
import TransferModal from "./TransferModal";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openTransfer, setOpenTransfer] = useState(false);
  const [summary, setSummary] = useState([]);
const [period, setPeriod] = useState("month");

  const [category, setCategory] = useState("");
  const [division, setDivision] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const load = async () => {
    const res = await API.get("/all");
    setData(res.data);

    const s = await API.get("/summary");
    setSummary(s.data);
  };

  const applyFilter = async () => {
    const res = await API.get("/filter", {
      params: { category, division, from, to }
    });
    setData(res.data);
  };

  useEffect(() => {
    load();
  }, []);
  const filteredByPeriod = data.filter(tx => {
  const d = new Date(tx.createdAt);
  const now = new Date();

  if (period === "week") {
    return (now - d) <= 7 * 24 * 60 * 60 * 1000;
  }

  if (period === "month") {
    return d.getMonth() === now.getMonth() &&
           d.getFullYear() === now.getFullYear();
  }

  if (period === "year") {
    return d.getFullYear() === now.getFullYear();
  }

  return true;
});


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Money Manager</h1>

      {/* Buttons */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Transaction
        </button>

        <button
          onClick={() => setOpenTransfer(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Transfer
        </button>
      </div>
      <select
  className="border p-2 mb-4"
  value={period}
  onChange={e => setPeriod(e.target.value)}
>
  <option value="month">Monthly View</option>
  <option value="week">Weekly View</option>
  <option value="year">Yearly View</option>
</select>


      {/* Summary Cards */}
      <div className="flex gap-4 mb-6">
        {summary.map(s => (
          <div key={s._id} className="p-4 shadow rounded bg-white">
            <div className="text-gray-500 capitalize">{s._id}</div>
            <div className="text-xl font-bold">₹{s.total}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
<SummaryChart summary={summary} />

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          placeholder="Category"
          className="border p-2"
          onChange={e => setCategory(e.target.value)}
        />

        <select
          className="border p-2"
          onChange={e => setDivision(e.target.value)}
        >
          <option value="">All Divisions</option>
          <option value="personal">Personal</option>
          <option value="office">Office</option>
        </select>

        <input
          type="date"
          className="border p-2"
          onChange={e => setFrom(e.target.value)}
        />

        <input
          type="date"
          className="border p-2"
          onChange={e => setTo(e.target.value)}
        />

        <button
          onClick={applyFilter}
          className="bg-gray-800 text-white px-3 py-2 rounded"
        >
          Apply Filter
        </button>

        <button
          onClick={load}
          className="border px-3 py-2 rounded"
        >
          Reset
        </button>
      </div>

      {/* List */}
<TransactionList data={filteredByPeriod} reload={load} />

      {/* Add Modal */}
      {open && (
        <AddTransactionModal
          close={() => setOpen(false)}
          reload={load}
        />
      )}

      {/* Transfer Modal */}
      {openTransfer && (
        <TransferModal
          close={() => setOpenTransfer(false)}
          reload={load}
        />
      )}
    </div>
  );
}
