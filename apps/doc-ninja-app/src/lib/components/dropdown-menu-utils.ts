// Types
type DropdownMenuSectionLabel = { sectionLabel: string };

type DropdownMenuItem = { label: string; onclick: () => void };

export type DropdownMenuOption =
  | 'SEPARATOR'
  | DropdownMenuSectionLabel
  | DropdownMenuItem;

// Type guards
export const getIsSeparator = (option: DropdownMenuOption): option is 'SEPARATOR' =>
  option === 'SEPARATOR';

export const getIsItem = (option: DropdownMenuOption): option is DropdownMenuItem =>
  !getIsSeparator(option) && 'label' in option;

export const getIsSectionLabel = (
  option: DropdownMenuOption
): option is DropdownMenuSectionLabel =>
  !getIsSeparator(option) && 'sectionLabel' in option;
