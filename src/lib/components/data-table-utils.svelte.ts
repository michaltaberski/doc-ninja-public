import type { Snippet } from 'svelte';

type DataTableHeader = {
  label: string;
};

type DataTableRow<TData> = {
  id: string;
  cells: {
    snippet?: Snippet<[{ value: unknown; row: TData }]>;
    value: unknown;
  }[];
};

export type DataTableColumn<TData, TKey extends keyof TData = keyof TData> = {
  key: TKey;
  label: string;
  sortable?: boolean;
  format?: (value: unknown) => string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  snippet?: Snippet<[{ value: any; row: TData }]>;
};

export type DataTableOptions<TData> = {
  idKey: keyof TData;
  columns: DataTableColumn<TData>[];
  data: TData[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createDataTable = <T extends Record<string, any>>(
  options: DataTableOptions<T>
) => {
  const headers = $state<DataTableHeader[]>([]);
  const rows = $state<DataTableRow<T>[]>([]);

  options.columns.forEach((column) => {
    headers.push({ label: column.label });
  });

  options.data.forEach((data) => {
    const row: DataTableRow<T> = {
      id: data[options.idKey],
      cells: options.columns.map((column) => ({
        snippet: column.snippet,
        value: column.format ? column.format(data[column.key]) : data[column.key]
      }))
    };
    rows.push(row);
  });

  return { headers, rows };
};
