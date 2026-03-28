"use client";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import type { POSItem } from "@/store/atoms";

interface POSMenuItemProps {
  item: POSItem;
  onAdd: (item: POSItem) => void;
}

export function POSMenuItem({ item, onAdd }: POSMenuItemProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onAdd(item)}
      className="glass rounded-lg p-3 text-left hover:violet-border transition-all duration-200 w-full group"
    >
      <div className="text-2xl mb-1">{item.emoji}</div>
      <p className="text-xs text-white font-medium leading-tight">{item.name}</p>
      <div className="flex items-center justify-between mt-2">
        <span className="text-[10px] text-[#A78BFA] font-bold">SAR {item.price}</span>
        <div className="w-5 h-5 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center group-hover:bg-[#8B5CF6]/20 transition-colors">
          <Plus size={10} className="text-[#A78BFA]" />
        </div>
      </div>
    </motion.button>
  );
}
