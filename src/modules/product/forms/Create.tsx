import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UseFormReturn } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

import * as Api from '../api';
import { LIST } from '../constants';
import * as Mappers from '../mappers';
import * as Types from '../types';

interface FormValues extends Types.IForm.Create {}

interface IChildren extends UseFormReturn<FormValues> {}

interface IProps {
  children: (props: IChildren) => React.ReactNode;
  className?: string;
  onError?: (error: string) => void;
  onSettled?: () => void;
  onSuccess?: (value: Types.IEntity.Product) => void;
}

const CreateForm: React.FC<IProps> = ({ children, onError, onSettled, onSuccess, className }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Types.IEntity.Product, string, FormValues, any>(
    async values => {
      const { data } = await Api.Create({ values });

      return Mappers.Product(data);
    },
    {
      onSuccess: data => {
        onSuccess && onSuccess(data);
        queryClient.invalidateQueries({
          predicate: query => query.queryKey[0] === LIST
        });
      },
      onError,
      onSettled
    }
  );

  const validationSchema = yup
    .object({
      title: yup.string().required(),
      category: yup.string().required()
    })
    .required();

  const form = useForm<FormValues>({
    defaultValues: {
      title: '',
      category: ''
    },
    resolver: yupResolver<FormValues>(validationSchema)
  });

  const onSubmit = form.handleSubmit(values => {
    mutation.mutate(values, {
      onSettled: () => form.reset()
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

export default CreateForm;
