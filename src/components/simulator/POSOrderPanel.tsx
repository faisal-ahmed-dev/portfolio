"use client";
import { useAtom } from "jotai";
import { posOrderAtom, posTotalAtom } from "@/store/atoms";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Printer, Trash2 } from "lucide-react";
import { NeonButton } from "@/components/ui/NeonButton";
import { toast } from "sonner";
import type { POSOrderItem } from "@/store/atoms";

export function POSOrderPanel() {
  const [order, setOrder] = useAtom(posOrderAtom);
  const [total] = useAtom(posTotalAtom);

  const updateQty = (item: POSOrderItem, delta: number) => {
    setOrder((prev) =>
      prev
        .map((o) =>
          o.item.id === item.item.id ? { ...o, qty: o.qty + delta } : o
        )
        .filter((o) => o.qty > 0)
    );
  };

  const printKOT = () => {
    const itemCount = order.reduce((sum, o) => sum + o.qty, 0);
    toast.success("KOT Sent to Kitchen!", {
      description: `${itemCount} item${itemCount > 1 ? "s" : ""} · SAR ${total}`,
      duration: 3000,
    });
    setTimeout(() => setOrder([]), 500);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-bold text-white">Current Order</h4>
        {order.length > 0 && (
          <button onClick={() => setOrder([])} className="text-[#555] hover:text-[#FF6B6B] transition-colors">
            <Trash2 size={14} />
          </button>
        )}
      </div>

      {/* Order items */}
      <div className="flex-1 overflow-y-auto space-y-2 min-h-[200px]">
        <AnimatePresence>
          {order.length === 0 ? (
            <p className="text-xs text-[#555] text-center py-8">Add items from the menu →</p>
          ) : (
            order.map((orderItem) => (
              <motion.div
                key={orderItem.item.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center gap-2 glass rounded-lg p-2"
              >
                <span className="text-lg">{orderItem.item.emoji}</span>
                <p className="text-xs text-white flex-1 leading-tight">{orderItem.item.name}</p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => updateQty(orderItem, -1)}
                    className="w-5 h-5 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center"
                  >
                    <Minus size={8} className="text-[#888]" />
                  </button>
                  <span className="text-xs text-white w-4 text-center">{orderItem.qty}</span>
                  <button
                    onClick={() => updateQty(orderItem, 1)}
                    className="w-5 h-5 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center"
                  >
                    <Plus size={8} className="text-[#888]" />
                  </button>
                </div>
                <span className="text-[10px] text-[#00F0FF] w-12 text-right">
                  SAR {orderItem.item.price * orderItem.qty}
                </span>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Total + KOT */}
      {order.length > 0 && (
        <div className="mt-4 pt-3 border-t border-white/5">
          <div className="flex justify-between mb-3">
            <span className="text-xs text-[#888]">Total</span>
            <span className="text-sm font-bold gradient-text">SAR {total}</span>
          </div>
          <NeonButton
            variant="primary"
            size="sm"
            className="w-full"
            onClick={printKOT}
          >
            <Printer size={14} /> Print KOT
          </NeonButton>
        </div>
      )}
    </div>
  );
}
