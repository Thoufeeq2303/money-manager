import { useState } from "react";
import { API } from "../api";
import EditTransactionModal from "./EditTransactionModal";

export default function TransactionList({ data, reload }) {

  const [editTx, setEditTx] = useState(null);

  const del = async (id) => {
    await API.delete("/delete/" + id);
    reload();
  };

  const canEdit = (createdAt) => {
    const hours =
      (Date.now() - new Date(createdAt)) / (1000 * 60 * 60);
    return hours <= 12;
  };

  return (
    <div className="space-y-2">
      {data.map(tx => (
        <div key={tx._id} className="p-3 border rounded flex justify-between">

          <div>
            <div className="font-semibold">
              {tx.type} — ₹{tx.amount}
            </div>
            <div className="text-sm text-gray-600">
              {tx.category} — {tx.division}
            </div>
          </div>

          <div className="space-x-3">
            {canEdit(tx.createdAt) && (
              <button
                onClick={() => setEditTx(tx)}
                className="text-blue-600"
              >
                Edit
              </button>
            )}

            <button
              onClick={() => del(tx._id)}
              className="text-red-600"
            >
              Delete
            </button>
          </div>

        </div>
      ))}

      {editTx && (
        <EditTransactionModal
          tx={editTx}
          close={() => setEditTx(null)}
          reload={reload}
        />
      )}
    </div>
  );
}
