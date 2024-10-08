import type { TableProps } from 'antd';
import { Table } from 'antd';

import { Filters, Sorts } from '@/common/types';

import * as Types from '@/modules/user/types';

interface IProps<T> {
  columns: TableProps<T>['columns'];
  data: T[];
  loading: boolean;
  onChange?: (filters: Filters<Types.IEntity.User>, sorter: Sorts<T>) => void;
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
