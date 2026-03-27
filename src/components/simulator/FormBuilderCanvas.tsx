"use client";
import { useAtom } from "jotai";
import { formFieldsAtom, type FieldType, type FormField } from "@/store/atoms";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { FormBuilderField } from "./FormBuilderField";

const FIELD_TYPES: { type: FieldType; label: string; emoji: string }[] = [
  { type: "text", label: "Text", emoji: "📝" },
  { type: "email", label: "Email", emoji: "📧" },
  { type: "number", label: "Number", emoji: "🔢" },
  { type: "select", label: "Select", emoji: "📋" },
  { type: "checkbox", label: "Checkbox", emoji: "☑️" },
  { type: "textarea", label: "Textarea", emoji: "📄" },
];

let fieldCounter = 10;

export function FormBuilderCanvas() {
  const [fields, setFields] = useAtom(formFieldsAtom);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setFields((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addField = (type: FieldType) => {
    const newField: FormField = {
      id: `f${++fieldCounter}`,
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      placeholder: `Enter ${type}...`,
      required: false,
    };
    setFields((prev) => [...prev, newField]);
  };

  const removeField = (id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {/* Add fields panel */}
      <div>
        <p className="text-xs text-[#888] mb-3 font-mono">// Click to add fields</p>
        <div className="flex flex-col gap-1.5">
          {FIELD_TYPES.map(({ type, label, emoji }) => (
            <button
              key={type}
              onClick={() => addField(type)}
              className="glass rounded-lg px-3 py-2 text-left text-xs text-[#C0C0C0] hover:text-[#00F0FF] hover:neon-border-cyan transition-all duration-200 flex items-center gap-2"
            >
              <span>{emoji}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Canvas */}
      <div className="md:col-span-2">
        <p className="text-xs text-[#888] mb-3 font-mono">// Drag to reorder</p>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-2">
              {fields.map((field) => (
                <FormBuilderField key={field.id} field={field} onRemove={removeField} />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {fields.length === 0 && (
          <p className="text-xs text-[#555] text-center py-8">No fields yet. Add some from the left panel.</p>
        )}
      </div>
    </div>
  );
}
