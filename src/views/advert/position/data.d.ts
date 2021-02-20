export interface TableListItem {
  id: number;
  name: string;
  sub: string;
  status: number;
}

export interface TableDataType {
  list: TableListItem[];
}
