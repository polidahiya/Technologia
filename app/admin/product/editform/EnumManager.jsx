"use client";
import { useState } from "react";
import { UpdateEnumField } from "./UpdateEnumField ";

export default function EnumManager({ title, field, values }) {
  const [items, setItems] = useState(values || []);
  const [newValue, setNewValue] = useState("");

  const addValue = () => {
    if (!newValue.trim()) return;
    if (items.includes(newValue.trim())) return;

    setItems([...items, newValue.trim()]);
    setNewValue("");
  };

  const removeValue = (value) => {
    setItems(items.filter((v) => v !== value));
  };

  const move = (index, direction) => {
    const newArr = [...items];
    const swapIndex = index + direction;
    if (swapIndex < 0 || swapIndex >= newArr.length) return;

    [newArr[index], newArr[swapIndex]] =
      [newArr[swapIndex], newArr[index]];

    setItems(newArr);
  };

  const saveChanges = async () => {
    await UpdateEnumField(field, items);
  };

  return (
    <div className="border p-4 rounded-xl space-y-4">
      <h2 className="text-lg font-semibold">{title}</h2>

      {/* Add input */}
      <div className="flex gap-2">
        <input
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          className="border px-2 py-1 rounded w-full"
          placeholder="Add new value"
        />
        <button
          onClick={addValue}
          className="bg-blue-500 text-white px-3 rounded"
        >
          Add
        </button>
      </div>

      {/* List */}
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li
            key={item}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span>{item}</span>

            <div className="flex gap-2">
              <button onClick={() => move(i, -1)}>⬆</button>
              <button onClick={() => move(i, 1)}>⬇</button>
              <button
                onClick={() => removeValue(item)}
                className="text-red-500"
              >
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button
        onClick={saveChanges}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </div>
  );
}
