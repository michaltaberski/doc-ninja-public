import { Dialog as SheetPrimitive } from 'bits-ui';
import { type VariantProps, tv } from 'tailwind-variants';

import Portal from './sheet-portal.svelte';
import Overlay from './sheet-overlay.svelte';
import Content from './sheet-content.svelte';
import Header from './sheet-header.svelte';
import Footer from './sheet-footer.svelte';
import Title from './sheet-title.svelte';
import Description from './sheet-description.svelte';
import Body from './sheet-body.svelte';

const Root = SheetPrimitive.Root;
const Close = SheetPrimitive.Close;
const Trigger = SheetPrimitive.Trigger;

export {
  Root,
  Close,
  Trigger,
  Portal,
  Overlay,
  Content,
  Header,
  Body,
  Footer,
  Title,
  Description,
  //
  Root as Sheet,
  Close as SheetClose,
  Trigger as SheetTrigger,
  Portal as SheetPortal,
  Overlay as SheetOverlay,
  Content as SheetContent,
  Header as SheetHeader,
  Body as SheetBody,
  Footer as SheetFooter,
  Title as SheetTitle,
  Description as SheetDescription
};

export const sheetVariants = tv({
  base: 'fixed z-50 flex flex-col sm:top-6 sm:right-6 sm:bottom-6',
  variants: {
    side: {
      top: 'inset-x-0 top-0',
      bottom: 'inset-x-0 bottom-0',
      left: 'inset-y-0 left-0 h-full w-3/4 sm:max-w-lg',
      right: 'inset-y-0 right-0 top-0 bottom-0 w-3/4 sm:max-w-lg'
    }
  },
  defaultVariants: {
    side: 'right'
  }
});

export const sheetTransitions = {
  top: {
    in: {
      y: '-100%',
      duration: 500,
      opacity: 1
    },
    out: {
      y: '-100%',
      duration: 300,
      opacity: 1
    }
  },
  bottom: {
    in: {
      y: '100%',
      duration: 500,
      opacity: 1
    },
    out: {
      y: '100%',
      duration: 300,
      opacity: 1
    }
  },
  left: {
    in: {
      x: '-100%',
      duration: 500,
      opacity: 1
    },
    out: {
      x: '-100%',
      duration: 300,
      opacity: 1
    }
  },
  right: {
    in: {
      x: '80%',
      duration: 400,
      opacity: 0
    },
    out: {
      x: '80%',
      duration: 300,
      opacity: 0
    }
  }
};

export type Side = VariantProps<typeof sheetVariants>['side'];
