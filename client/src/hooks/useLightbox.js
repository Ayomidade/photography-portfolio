/**
 * useLightbox
 *
 * Manages the open/close state and active photo index for the Lightbox component.
 * Called in FeaturedGrid and passed down to both PhotoCard and Lightbox.
 *
 * Returns:
 * - `isOpen` — boolean, whether the lightbox is currently visible
 * - `activeIndex` — index of the currently displayed photo in the photos array
 * - `open(index)` — opens the lightbox at the given photo index
 * - `close()` — closes the lightbox and resets active index to 0
 * - `next(total)` — advances to the next photo, wraps around to 0 at the end
 * - `prev(total)` — goes back to the previous photo, wraps around to last at the start
 *
 * Usage:
 * const { isOpen, activeIndex, open, close, next, prev } = useLightbox(total)
 *
 * Body scroll is locked when the lightbox is open so the background
 * page doesn't scroll while the user is viewing a photo.
 * Escape key closes the lightbox — listener is cleaned up on unmount.
 */

import { useState, useEffect } from "react";

const useLightbox = (total = 0) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const open = (index = 0) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setActiveIndex(0);
  };

  const next = (total) => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const prev = (total) => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  // lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next(total);
      if (e.key === "ArrowLeft") prev(total);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, activeIndex, total]);

  return { isOpen, activeIndex, open, close, next, prev };
};

export default useLightbox;
