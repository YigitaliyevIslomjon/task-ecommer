import React, { useCallback, useState } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { TableProps } from 'antd';
import { message, Popconfirm, PopconfirmProps, Space } from 'antd/lib';
import { debounce } from 'radash';
import { NumberParam, StringParam, useQueryParams, withDefault } from 'use-query-params';

import { Filters, SORT_ORDER, Sorts } from '@/common/types';

import { useList } from '@/modules/user/hooks';
import useDelete from '@/modules/user/hooks/useDelete';
import * as Types from '@/modules/user/types';

import Header from '@/components/Header';
import Pagenation from '@/components/Pagenation';
import Spacer from '@/components/Spacer';
import { GenericTable } from '@/components/Table';

import UserCreateModal from './components/CreateModal';
import UserUpdateModal from './components/UpdateModal';

import classes from './UserPage.module.scss';

interface IProps {}
type Filter = Filters<Types.IEntity.User>;
type Sort = Sorts<Types.IEntity.User>;

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
    debounce({ delay: 500 }, value => {
      if (!value) {
        setQuery({ q: undefined });
      } else {
        setQuery({ q: value });
      }
    }),
    []
  );

  const handleTableChange = (filters: Filter, sorter: Sort) => {
    if (!filters.firstName?.length) {
      setQuery({
        key: undefined,
        value: undefined
      });
    }
    if (sorter.field == 'firstName') {
      setQuery({
        sortBy: sorter.order == 'ascend' || sorter.order == 'descend' ? sorter.field : undefined,
        order: sorter.order === 'ascend' ? SORT_ORDER.ASC : sorter.order === 'descend' ? SORT_ORDER.DESC : undefined
      });
    }
  };

  const columns: TableProps<Types.IEntity.User>['columns'] = [
    {
      title: 'name',
      dataIndex: 'firstName',
      key: 'firstName',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      sortOrder: query.order === SORT_ORDER.ASC ? 'ascend' : query.order === SORT_ORDER.DESC ? 'descend' : null,
      filteredValue: query.key == 'firstName' && query.value ? [query.value] : null,
      filters: [
        {
          text: 'Michael',
          value: 'Michael'
        }
      ],
      onFilter: (value, _) => {
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
      key: 'age'
    },
    {
      title: 'eyeColor',
      dataIndex: 'eyeColor',
      key: 'eyeColor'
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
      <GenericTable columns={columns} data={items} loading={isFetching} onChange={handleTableChange} />
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
