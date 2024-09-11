import type { TableProps } from 'antd';
import { Table } from 'antd';
import { SorterResult } from 'antd/lib/table/interface';

import { Filters } from '@/common/types';

import * as Types from '@/modules/user/types';

interface IProps<T> {
  columns: TableProps<T>['columns'];
  data: T[];
  loading: boolean;
  onChange?: (filters: Filters<Types.IEntity.User>, sorter: SorterResult<T> | SorterResult<T>[]) => void;
}

const GenericTable = <T extends object>({ columns, data, loading = false, onChange }: IProps<T>): JSX.Element => (
  <Table
    columns={columns}
    dataSource={data}
    pagination={false}
    loading={loading}
    onChange={(_, filters, sorts) => onChange && onChange(filters, sorts)}
  />
);

export default GenericTable;
