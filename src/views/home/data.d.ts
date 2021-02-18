export interface ChartDataType {
  day: string[];
  num: number[];
}

export interface ArticleChartDataType {
  total: number;
  num: number;
  week: number;
  day: number;
}

export interface WorksChartDataType {
  total: number;
  num: number;
  chart: ChartDataType;
}

export interface TopicsChartDataType {
  total: number;
  num: number;
  chart: ChartDataType;
}

export interface LinksChartDataType {
  total: number;
  num: number;
  chart: ChartDataType;
}

export interface TableListQueryParams {
  page: number;
  per: number;
  sort?: number;
}

export interface PaginationConfig {
  total: number;
  current: number;
  pageSize: number;
  showSizeChanger: boolean;
}
