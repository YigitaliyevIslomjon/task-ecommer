import React, { useCallback, useState } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { TableProps } from 'antd';
import { message, Popconfirm, PopconfirmProps, Space } from 'antd/lib';
import { debounce } from 'radash';
import { NumberParam, StringParam, useQueryParams, withDefault } from 'use-query-params';

import { Filters, SORT_ORDER, Sorts } from '@/common/types';

import { useList } from '@/modules/product/hooks';
import useDelete from '@/modules/product/hooks/useDelete';
import * as Types from '@/modules/product/types';

import Header from '@/components/Header';
import Pagenation from '@/components/Pagenation';
import Spacer from '@/components/Spacer';
import { GenericTable } from '@/components/Table';

import ProductCreateModal from './components/CreateModal';
import ProductUpdateModal from './components/UpdateModal';

import classes from './ProductPage.module.scss';

interface IProps {}
type Filter = Filters<Types.IEntity.Product>;
type Sort = Sorts<Types.IEntity.Product>;

const List: React.FC<IProps> = () => {
  const [productCreateModal, setProductCreateModal] = useState(false);
  const [productUpdateModal, setProductUpdateModal] = useState(false);
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
      q: query.q
    }
  });

  const handlePropmConfirm: PopconfirmProps['onConfirm'] = () => {
    mutate({ id });
    message.success('deleted');
  };

  const handlePropmCancel: PopconfirmProps['onCancel'] = () => {
    message.error('cenceled');
  };

  const handleTableChange = (filters: Filter, sorter: Sort) => {
    if (sorter.field == 'title') {
      setQuery({
        sortBy: sorter.order == 'ascend' || sorter.order == 'descend' ? sorter.field : undefined,
        order: sorter.order === 'ascend' ? SORT_ORDER.ASC : sorter.order === 'descend' ? SORT_ORDER.DESC : undefined
      });
    }
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

  const columns: TableProps<Types.IEntity.Product>['columns'] = [
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      sortOrder: query.order === SORT_ORDER.ASC ? 'ascend' : query.order === SORT_ORDER.DESC ? 'descend' : null
    },
    {
      title: 'category',
      dataIndex: 'category',
      key: 'category'
    },
    {
      title: 'price',
      dataIndex: 'price',
      key: 'price'
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
              setProductUpdateModal(true);
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
          setProductCreateModal(true);
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
      <ProductCreateModal
        isOpen={productCreateModal}
        onClose={() => {
          setProductCreateModal(false);
        }}
      />
      {productUpdateModal && (
        <ProductUpdateModal
          id={id}
          isOpen={productUpdateModal}
          onClose={() => {
            setProductUpdateModal(false);
          }}
        />
      )}
    </>
  );
};

export default List;
