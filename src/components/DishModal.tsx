import React, { useState } from 'react';
import { X, Plus, Minus, Clock, Star } from 'lucide-react';
import { AddOnOption, MenuItem } from '../types';
import { DishArtwork } from './DishArtwork';

interface DishModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onConfirmAdd: (
    item: MenuItem,
    quantity: number,
    selectedAddOns: AddOnOption[],
    note: string
  ) => void;
}

export const DishModal: React.FC<DishModalProps> = ({
  item,
  onClose,
  onConfirmAdd,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [note, setNote] = useState('');

  if (!item) return null;

  const selectedAddOns = item.addOns.filter((a) => selectedIds.includes(a.id));
  const addOnsSum = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
  const lineTotal = (item.price + addOnsSum) * quantity;

  const toggleAddOn = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#172554]/50 backdrop-blur-sm p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dish-modal-title"
    >
      <div className="w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl card-elevation-2 overflow-hidden max-h-[90vh] flex flex-col">
        <div className="relative h-52 bg-[#F8FAFC] shrink-0">
          <DishArtwork artworkId={item.artworkId} />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dish details"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/95 text-[#172554] hover:bg-white flex items-center justify-center shadow-sm cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-[#64748B]">
              <span className="tnum">
                {item.calories} kcal • {item.stallName}
              </span>
              <span className="inline-flex items-center gap-1 text-[#172554] font-bold tnum">
                <Star className="w-3.5 h-3.5 fill-[#FF7A30] text-[#FF7A30]" />
                {item.rating.toFixed(1)}
              </span>
            </div>

            <div className="mt-1.5 flex items-start justify-between gap-4">
              <h2 id="dish-modal-title" className="text-xl font-extrabold text-[#172554]">
                {item.name}
              </h2>
              <span className="text-xl font-extrabold text-[#FF7A30] tnum shrink-0">
                ₹{item.price}
              </span>
            </div>

            <p className="mt-2 text-sm text-[#64748B] leading-relaxed">
              {item.description}
            </p>

            <p className="mt-2.5 text-xs font-semibold text-[#172554] inline-flex items-center gap-1.5 tnum">
              <Clock className="w-3.5 h-3.5 text-[#FF7A30]" />
              Prep time: ~{item.prepMins} mins • {item.counterLabel}
            </p>
          </div>

          {item.addOns.length > 0 && (
            <div className="pt-4 border-t border-[#E2E8F0]">
              <h3 className="text-xs font-bold uppercase tracking-[0.04em] text-[#172554] mb-2.5">
                Customize with Add-Ons
              </h3>
              <div className="space-y-2">
                {item.addOns.map((addon) => {
                  const checked = selectedIds.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddOn(addon.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-colors cursor-pointer ${
                        checked
                          ? 'border-[#FF7A30] bg-[#FF7A30]/5 text-[#172554]'
                          : 'border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-[#172554]'
                      }`}
                    >
                      <span className="text-xs font-bold">{addon.label}</span>
                      <span className="text-xs font-extrabold text-[#FF7A30] tnum">
                        +₹{addon.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-[#E2E8F0]">
            <label
              htmlFor="kitchen-note"
              className="block text-xs font-bold uppercase tracking-[0.04em] text-[#172554] mb-2"
            >
              Kitchen Note (Optional)
            </label>
            <input
              id="kitchen-note"
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g., Extra crispy, less spicy, pack chutney separately..."
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border-[1.5px] border-[#E2E8F0] bg-[#F8FAFC] text-[#172554] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#FF7A30] focus:ring-[3px] focus:ring-[#FF7A30]/15"
            />
          </div>
        </div>

        <div className="p-5 border-t border-[#E2E8F0] bg-white flex items-center justify-between gap-4 shrink-0">
          <div className="inline-flex items-center rounded-full border border-[#E2E8F0] bg-[#F8FAFC] p-1">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#172554] hover:bg-white cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-7 text-center text-xs font-extrabold text-[#172554] tnum">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Increase quantity"
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#172554] hover:bg-white cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              onConfirmAdd(item, quantity, selectedAddOns, note.trim());
              onClose();
            }}
            className="flex-1 h-11 px-5 rounded-xl bg-[#FF7A30] hover:bg-[#EA661E] text-white text-sm font-bold flex items-center justify-between cursor-pointer transition-colors"
          >
            <span>Add to Cart</span>
            <span className="tnum font-extrabold">₹{lineTotal}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
