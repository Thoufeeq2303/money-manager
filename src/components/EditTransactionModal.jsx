import { useState } from "react";
import { API } from "../api";

export default function EditTransactionModal({ tx, close, reload }) {
  const [form, setForm] = useState(tx);

  const submit = async () => {
    await API.put("/edit/" + tx._id, form);
    reload();
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96 space-y-3">

        <h2 className="text-xl font-bold">Edit Transaction</h2>

        <select
          className="border p-2 w-full"
          value={form.type}
          onChange={e=>setForm({...form,type:e.target.value})}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input
          className="border p-2 w-full"
          value={form.amount}
          onChange={e=>setForm({...form,amount:Number(e.target.value)})}
        />

        <input
          className="border p-2 w-full"
          value={form.category}
          onChange={e=>setForm({...form,category:e.target.value})}
        />

        <select
          className="border p-2 w-full"
          value={form.division}
          onChange={e=>setForm({...form,division:e.target.value})}
        >
          <option value="personal">Personal</option>
          <option value="office">Office</option>
        </select>

        <button
          onClick={submit}
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          Update
        </button>

        <button
          onClick={close}
          className="border px-4 py-2 rounded w-full"
        >
          Cancel
        </button>

      </div>
    </div>
  );
}
