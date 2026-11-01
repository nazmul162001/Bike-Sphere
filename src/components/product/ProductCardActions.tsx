"use client";

import { Heart, Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addItem } from "@/store/slices/cartSlice";
import { toggleFavorite } from "@/store/slices/favoritesSlice";
import { pushToast } from "@/store/slices/uiSlice";
import { selectIsFavorite } from "@/store/selectors/favorites";
import { cn } from "@/lib/utils/cn";

export function ProductCardActions({
  productId,
  productName,
}: {
  productId: string;
  productName: string;
}) {
  const dispatch = useAppDispatch();
  const favorited = useAppSelector(selectIsFavorite(productId));

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => {
          dispatch(addItem({ productId, quantity: 1 }));
          dispatch(
            pushToast({
              tone: "success",
              title: "Added to request list",
              description: `${productName} is ready for a quotation request.`,
            }),
          );
        }}
        className="inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-sm bg-lime px-3 text-xs font-semibold tracking-wide text-ink-950 hover:bg-lime-hover"
      >
        <Plus className="size-3.5" />
        Add to request
      </button>
      <button
        type="button"
        aria-pressed={favorited}
        aria-label={favorited ? "Remove from favorites" : "Save to favorites"}
        onClick={() => dispatch(toggleFavorite(productId))}
        className={cn(
          "grid size-9 place-items-center rounded-sm border border-ink-700 bg-ink-900 text-ink-300 hover:text-lime",
          favorited && "border-lime/40 text-lime",
        )}
      >
        <Heart className={cn("size-4", favorited && "fill-current")} />
      </button>
    </div>
  );
}
