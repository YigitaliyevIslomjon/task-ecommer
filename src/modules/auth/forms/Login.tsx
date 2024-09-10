import React from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { message } from 'antd/lib';
import type { UseFormReturn } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

import config from '@/config.ts';

import * as Api from '../api';
import { useContext } from '../context';
import * as Mappers from '../mappers';
import * as Types from '../types';

import { keepOptions } from '@/helpers';
import { storage } from '@/services';

interface FormValues extends Types.IForm.Login {}

interface IChildren extends UseFormReturn<FormValues> {}

interface IProps {
  children: (props: IChildren) => React.ReactNode;
  className?: string;
  onError?: (error: string) => void;
  onSettled?: () => void;
  onSuccess?: (value: Types.IEntity.Profile) => void;
}

const LoginForm: React.FC<IProps> = ({ children, onError, onSettled, onSuccess, className }) => {
  const { methods } = useContext();
  const navigate = useNavigate();

  const mutation = useMutation<Types.IEntity.Profile, string, FormValues, any>(
    async values => {
      const { data } = await Api.Login(values);
      return Mappers.Profile(data);
    },
    {
      onSuccess: data => {
        onSuccess && onSuccess(data);

        storage.local.set(config.api.accessTokenKey, data.accessToken);
        storage.local.set(config.api.refreshTokenKey, data.refreshToken);

        methods.setIsAuthenticated(true);
        methods.setTokens({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken
        });
        navigate('/user');
      },
      onError: error => {
        message.success(`${error?.response?.data?.message}`);
      },
      onSettled
    }
  );

  const validationSchema = yup
    .object({
      username: yup.string().required(),
      password: yup.string().required()
    })
    .required();

  const form = useForm<FormValues>({
    defaultValues: {
      username: '',
      password: ''
    },
    resolver: yupResolver<FormValues>(validationSchema)
  });

  const onSubmit = form.handleSubmit(values => {
    mutation.mutate(values, {
      onSettled: () => form.reset({ ...form.getValues() }, { ...keepOptions })
    });
  });

  return (
    <FormProvider {...form}>
      <form className={className} onSubmit={onSubmit}>
        {children(form)}
      </form>
    </FormProvider>
  );
};

export default LoginForm;
