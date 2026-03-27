"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import type { FormField } from "@/store/atoms";

interface FormBuilderFieldProps {
  field: FormField;
  onRemove: (id: string) => void;
}

export function FormBuilderField({ field, onRemove }: FormBuilderFieldProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="glass rounded-lg p-3 flex items-center gap-3 group"
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="text-[#444] hover:text-[#00F0FF] cursor-grab active:cursor-grabbing shrink-0"
      >
        <GripVertical size={16} />
      </div>

      {/* Field preview */}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-white font-medium truncate">
          {field.label}
          {field.required && <span className="text-[#FF6B6B] ml-1">*</span>}
        </p>
        <p className="text-[10px] text-[#555] mt-0.5">
          {field.type}
          {field.placeholder && ` · "${field.placeholder}"`}
        </p>
      </div>

      {/* Remove */}
      <button
        onClick={() => onRemove(field.id)}
        className="opacity-0 group-hover:opacity-100 text-[#555] hover:text-[#FF6B6B] transition-all"
        aria-label="Remove field"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
