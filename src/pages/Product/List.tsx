import React, { useCallback, useState } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { TableProps } from 'antd';
import { message, Popconfirm, PopconfirmProps, Space } from 'antd/lib';
import { debounce } from 'radash';
import { NumberParam, StringParam, useQueryParams, withDefault } from 'use-query-params';

import { useList } from '@/modules/product/hooks';
import useDelete from '@/modules/product/hooks/useDelete';

import { GenericTable } from '@/containers/Table';

import Header from '@/components/Header';
import Pagenation from '@/components/Pagenation';
import Spacer from '@/components/Spacer';

import ProductCreateModal from './components/CreateModal';
import ProductUpdateModal from './components/UpdateModal';

import classes from './ProductPage.module.scss';

interface IProps {}

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
    title: string;
    category: string;
    id: string;
    price: string;
  }

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title'
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
