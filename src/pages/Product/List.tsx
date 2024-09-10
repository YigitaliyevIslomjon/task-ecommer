import React, { useCallback, useState } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { TableProps } from 'antd';
import { message, Popconfirm, PopconfirmProps, Space } from 'antd/lib';
import { debounce } from 'radash';
import { NumberParam, StringParam, useQueryParams, withDefault } from 'use-query-params';

import { useList } from '@/modules/user/hooks';
import useDelete from '@/modules/user/hooks/useDelete';

import { GenericTable } from '@/containers/Table';

import Header from '@/components/Header';
import Pagenation from '@/components/Pagenation';
import Spacer from '@/components/Spacer';

import UserCreateModal from './components/CreateModal';
import UserUpdateModal from './components/UpdateModal';

import classes from './ProductPage.module.scss';

interface IProps {}

const List: React.FC<IProps> = () => {
  const [userCreateModal, setUserCreateModal] = useState(false);
  const [userUpdateModal, setUserUpdateModal] = useState(false);
  const [id, setId] = useState('');

  const [query, setQuery] = useQueryParams({
    skip: withDefault(NumberParam, undefined),
    limit: withDefault(NumberParam, undefined),
    order: withDefault(StringParam, undefined),
    sortBy: withDefault(StringParam || NumberParam, undefined),
    q: withDefault(StringParam, undefined),
    key: withDefault(StringParam, undefined),
    value: withDefault(StringParam || NumberParam, undefined)
  });

  const { mutate } = useDelete();
  const { items, isFetching } = useList({
    params: {
      skip: query.skip,
      limit: query.limit,
      order: query.order,
      sortBy: query.sortBy,
      q: query.q,
      key: query.key,
      value: query.value
    }
  });

  const handlePropmConfirm: PopconfirmProps['onConfirm'] = () => {
    mutate({ id });
    message.success('deleted');
  };

  const handlePropmCancel: PopconfirmProps['onCancel'] = () => {
    message.error('cenceled');
  };

  // Debounce the search function
  const handleSearch = useCallback(
    debounce({ delay: 300 }, value => {
      if (!value) {
        setQuery({ q: undefined });
      } else {
        setQuery({ q: value });
      }
    }),
    []
  );

  interface DataType {
    firstName: string;
    age: number;
    id: string;
    eyeColor: string;
  }

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'firstName',
      filters: [
        {
          text: 'Michael',
          value: 'Michael'
        }
      ],
      onFilter: (value, _) => {
        console.log(value, 'f');
        setQuery({
          key: 'firstName',
          value: value as string
        });
        return true;
      }
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      filters: [
        {
          text: '24',
          value: '24'
        }
      ],
      onFilter: (value, _) => {
        setQuery({
          key: 'age',
          value: value as string
        });
        return true;
      }
    },
    {
      title: 'eyeColor',
      dataIndex: 'eyeColor',
      key: 'eyeColor',
      filters: [
        {
          text: 'Red',
          value: 'Red'
        }
      ],
      onFilter: (value, _) => {
        setQuery({
          key: 'eyeColor',
          value: value as string
        });
        return true;
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            className={classes.icon}
            onClick={() => {
              setId(record.id);
              setUserUpdateModal(true);
            }}
          />
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this item?"
            onConfirm={handlePropmConfirm}
            onCancel={handlePropmCancel}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined
              className={classes.icon}
              onClick={() => {
                setId(record.id);
              }}
            />
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <>
      <Header
        onClick={() => {
          setUserCreateModal(true);
        }}
        onSearch={value => {
          handleSearch(value);
        }}
      />
      <Spacer size={6} />
      <GenericTable columns={columns} data={items} loading={isFetching} />
      <Spacer size={6} />
      <Pagenation
        onShowSizeChange={(currentPage, PageSize) => {
          setQuery({
            skip: currentPage,
            limit: PageSize
          });
        }}
        currentPage={query.skip || 1}
        defaultPageSize={query.limit || 10}
        total={100}
      />
      <UserCreateModal
        isOpen={userCreateModal}
        onClose={() => {
          setUserCreateModal(false);
        }}
      />
      {userUpdateModal && (
        <UserUpdateModal
          id={id}
          isOpen={userUpdateModal}
          onClose={() => {
            setUserUpdateModal(false);
          }}
        />
      )}
    </>
  );
};

export default List;
