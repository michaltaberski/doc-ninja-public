type DataTableHeader = {
  label: string;
};

type DataTableRow = {
  id: string;
  cells: {
    value: unknown;
  }[];
};

export type DataTableColumn<TData, TKey extends keyof TData = keyof TData> = {
  key: TKey;
  label: string;
  sortable?: boolean;
  format?: (value: TData[TKey]) => string;
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
  const rows = $state<DataTableRow[]>([]);

  options.columns.forEach((column) => {
    headers.push({ label: column.label });
  });

  options.data.forEach((data) => {
    const row: DataTableRow = {
      id: data[options.idKey],
      cells: options.columns.map((column) => ({
        value: column.format ? column.format(data[column.key]) : data[column.key]
      }))
    };
    rows.push(row);
  });

  return { headers, rows };
};
