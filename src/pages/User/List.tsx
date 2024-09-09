import React, { useState } from 'react';
import { TableProps, Tag } from 'antd';
import { Space } from 'antd/lib';

import { GenericTable } from '@/containers/Table';

import Header from '@/components/Header';
import Spacer from '@/components/Spacer';

import UserCreateModal from './components/UserCreateModal';

interface IProps {}

const List: React.FC<IProps> = () => {
  const [userCreateModal, setUserCreateModal] = useState(false);

  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
  }

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <div>Edit</div>
          <div>Delete</div>
        </Space>
      )
    }
  ];

  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer']
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser']
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher']
    }
  ];

  return (
    <>
      <Header
        onClick={() => {
          setUserCreateModal(true);
        }}
        onSearch={() => {}}
      />
      <Spacer size={6} />
      <GenericTable {...{ columns, data }} />
      <UserCreateModal
        isOpen={userCreateModal}
        onClose={() => {
          setUserCreateModal(false);
        }}
      />
    </>
  );
};

export default List;
