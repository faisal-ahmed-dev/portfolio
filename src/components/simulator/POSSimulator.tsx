"use client";
import { useSetAtom } from "jotai";
import { posOrderAtom } from "@/store/atoms";
import type { POSItem, POSOrderItem } from "@/store/atoms";
import { POSMenuItem } from "./POSMenuItem";
import { POSOrderPanel } from "./POSOrderPanel";

const MENU_ITEMS: POSItem[] = [
  { id: "m1", name: "Margherita Pizza", price: 45, category: "Pizza", emoji: "🍕" },
  { id: "m2", name: "Chicken Burger", price: 35, category: "Burgers", emoji: "🍔" },
  { id: "m3", name: "Caesar Salad", price: 28, category: "Salads", emoji: "🥗" },
  { id: "m4", name: "Pasta Carbonara", price: 42, category: "Pasta", emoji: "🍝" },
  { id: "m5", name: "Diet Coke", price: 12, category: "Drinks", emoji: "🥤" },
  { id: "m6", name: "Chocolate Lava", price: 22, category: "Desserts", emoji: "🍰" },
];

export function POSSimulator() {
  const setOrder = useSetAtom(posOrderAtom);

  const addItem = (item: POSItem) => {
    setOrder((prev: POSOrderItem[]) => {
      const existing = prev.find((o) => o.item.id === item.id);
      if (existing) {
        return prev.map((o) => o.item.id === item.id ? { ...o, qty: o.qty + 1 } : o);
      }
      return [...prev, { item, qty: 1 }];
    });
  };

  return (
    <div className="grid md:grid-cols-3 gap-4 h-full">
      {/* Menu */}
      <div className="md:col-span-2">
        <p className="text-xs text-[#888] mb-3 font-mono">// Menu — click to add to order</p>
        <div className="grid grid-cols-3 gap-2">
          {MENU_ITEMS.map((item) => (
            <POSMenuItem key={item.id} item={item} onAdd={addItem} />
          ))}
        </div>
      </div>

      {/* Order Panel */}
      <div className="glass rounded-xl p-4">
        <POSOrderPanel />
      </div>
    </div>
  );
}
