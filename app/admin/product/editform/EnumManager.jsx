"use client";
import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";

import copytoclipboard from "@/app/_globalcomps/copytoclipboard";
import { CSS } from "@dnd-kit/utilities";
import { UpdateEnumField } from "./UpdateEnumField ";
import { AppContextfn } from "@/app/Context";

function SortableItem({ id, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex justify-between items-center border p-2 rounded bg-white"
    >
      <div {...attributes} {...listeners} className="cursor-grab flex-1">
        {id}
      </div>

      <button onClick={() => onRemove(id)} className="text-red-500 ml-2">
        ✕
      </button>
    </div>
  );
}

export default function EnumManager({ title, field, values }) {
  const { setmessagefn } = AppContextfn();
  const [items, setItems] = useState(values || []);
  const [newValue, setNewValue] = useState("");

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = items.indexOf(active.id);
    const newIndex = items.indexOf(over.id);

    setItems(arrayMove(items, oldIndex, newIndex));
  };

  const addValue = () => {
    const trimmed = newValue.trim();
    if (!trimmed || items.includes(trimmed)) return;

    setItems([...items, trimmed]);
    setNewValue("");
  };

  const removeValue = (value) => {
    setItems(items.filter((v) => v !== value));
  };

  const saveChanges = async () => {
    const res = await UpdateEnumField(field, items);
    setmessagefn(res?.message);
  };

  return (
    <div className="border p-4 rounded-xl space-y-4 bg-gray-50">
      <h2 className="text-lg font-semibold">
        {title}
        <button
          className="text-blue-600 ml-5 text-sm"
          onClick={() => {
            copytoclipboard(`[${items.join(",")}]`, () => {
              setmessagefn("Copied Successfully");
            });
          }}
        >
          Copy
        </button>
      </h2>

      {/* Add new */}
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

      {/* Drag list */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {items.map((item) => (
              <SortableItem key={item} id={item} onRemove={removeValue} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <button
        onClick={saveChanges}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </div>
  );
}
