import { TableProps } from 'antd/lib';
import { SorterResult } from 'antd/lib/table/interface';

type OnChange<T> = NonNullable<TableProps<T>['onChange']>;
export type Filters<T> = Parameters<OnChange<T>>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
export type SortSingle<T> = GetSingle<Parameters<OnChange<T>>[2]>;
export type Sorts<T> = SortSingle<T> | SorterResult<T> | SorterResult<T>[];

export enum SORT_ORDER {
  ASC = 'asc',
  DESC = 'desc'
}
