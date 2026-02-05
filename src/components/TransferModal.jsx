import { useState } from "react";
import { API } from "../api";

export default function TransferModal({ close, reload }) {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("wallet");
  const [to, setTo] = useState("bank");

  const submit = async () => {
    await API.post("/add", {
      type: "expense",
      amount,
      category: "transfer",
      division: "personal",
      description: "Transfer Out",
      account: from
    });

    await API.post("/add", {
      type: "income",
      amount,
      category: "transfer",
      division: "personal",
      description: "Transfer In",
      account: to
    });

    reload();
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96 space-y-3">

        <h2 className="text-xl font-bold">Account Transfer</h2>

        <input
          className="border p-2 w-full"
          placeholder="Amount"
          type="number"
          onChange={e => setAmount(Number(e.target.value))}
        />

        <select
          className="border p-2 w-full"
          onChange={e => setFrom(e.target.value)}
        >
          <option value="wallet">Wallet</option>
          <option value="bank">Bank</option>
        </select>

        <select
          className="border p-2 w-full"
          onChange={e => setTo(e.target.value)}
        >
          <option value="bank">Bank</option>
          <option value="wallet">Wallet</option>
        </select>

        <button
          onClick={submit}
          className="bg-purple-600 text-white px-4 py-2 rounded w-full"
        >
          Transfer
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
