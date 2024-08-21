type DataTableHeader = {
  label: string;
};

type DataTableRow<T> = {
  id: string;
  cells: {
    value: T[keyof T];
  }[];
};

export type DataTableColumn<T> = {
  key: keyof T;
  label: string;
  sortable?: boolean;
  format?: (value: T[keyof T]) => string;
};

export type DataTableOptions<T> = {
  idKey: keyof T;
  columns: DataTableColumn<T>[];
  data: T[];
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
        value: data[column.key]
      }))
    };
    rows.push(row);
  });

  return { headers, rows };
};
