import type { TableProps } from 'antd';
import { Table } from 'antd';

interface IProps<T> {
  columns: TableProps<T>['columns'];
  data: T[];
}

const GenericTable = <T extends object>({ columns, data }: IProps<T>): JSX.Element => (
  <Table columns={columns} dataSource={data} />
);
export default GenericTable;
