import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import type { UseFormReturn } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

import * as Api from '../api';
import * as Mappers from '../mappers';
import * as Types from '../types';

import { keepOptions } from '@/helpers';

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
  const mutation = useMutation<Types.IEntity.Profile, string, FormValues, any>(
    async values => {
      console.log(values);
      const { data } = await Api.Login(values);

      return Mappers.Profile(data?.data);
    },
    {
      onSuccess: data => {
        onSuccess && onSuccess(data);
      },
      onError,
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
