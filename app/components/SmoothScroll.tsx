'use client';

import { useEffect } from 'react';
import { setSmoothScroll } from '../scripts/lenis';

export function SmoothScroll() {
  useEffect(() => {
    let lenis: any = null;

    setSmoothScroll().then((instance) => {
      lenis = instance;
    });

    return () => {
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  return null;
}
