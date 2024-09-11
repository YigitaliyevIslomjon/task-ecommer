import { TableProps } from 'antd/lib';

type OnChange<T> = NonNullable<TableProps<T>['onChange']>;
export type Filters<T> = Parameters<OnChange<T>>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
export type Sorts<T> = GetSingle<Parameters<OnChange<T>>[2]>;

export enum SORT_ORDER {
  ASC = 'asc',
  DESC = 'desc'
}

