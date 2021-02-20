export interface TableListItem {
  id: number;
  name: string;
  status: number;
}

export interface TableDataType {
  list: TableListItem[];
}
