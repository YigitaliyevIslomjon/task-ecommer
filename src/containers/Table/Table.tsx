import type { TableProps } from 'antd';
import { Table } from 'antd';

interface IProps<T> {
  columns: TableProps<T>['columns'];
  data: T[];
  loading: boolean;
}

const GenericTable = <T extends object>({ columns, data, loading = false }: IProps<T>): JSX.Element => (
  <Table
    columns={columns}
    dataSource={data}
    pagination={false}
    loading={loading}
    
    onChange={(e, e2, e3) => {
      console.log(e, e2, e3);
    }}
  />
);
export default GenericTable;
