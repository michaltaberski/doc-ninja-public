// Types
type DropdownMenuLabel = { label: string };

type DropdownMenuItem = { item: string; onclick: () => void };

export type DropdownMenuOption = 'SEPARATOR' | DropdownMenuLabel | DropdownMenuItem;

// Type guards
export const getIsSeparator = (option: DropdownMenuOption): option is 'SEPARATOR' =>
  option === 'SEPARATOR';

export const getIsItem = (option: DropdownMenuOption): option is DropdownMenuItem =>
  !getIsSeparator(option) && 'item' in option;

export const getIsLabel = (option: DropdownMenuOption): option is DropdownMenuLabel =>
  !getIsSeparator(option) && 'label' in option;
