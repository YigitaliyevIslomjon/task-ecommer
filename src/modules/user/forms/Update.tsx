import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UseFormReturn } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

import * as Api from '../api.ts';
import * as Mappers from '../mappers.ts';
import * as Types from '../types';

import { keepOptions } from '@/helpers';

interface FormValues extends Types.IForm.Update {}

interface IChildren extends UseFormReturn<FormValues> {}

interface IProps {
  id: string;
  values: Types.IEntity.User;
  children: (props: IChildren) => React.ReactNode;
  className?: string;
  onError?: (error: string) => void;
  onSettled?: () => void;
  onSuccess?: (value: Types.IEntity.User) => void;
}

const UpdateForm: React.FC<IProps> = ({ children, values, className, onSettled, onSuccess, onError, id }) => {
  const queryClient = useQueryClient();
  console.log('values', values, id);
  const mutation = useMutation<Types.IEntity.User, string, FormValues, any>(
    async values => {
      const { data } = await Api.Update({ id, values });
      return Mappers.User(data);
    },
    {
      onSuccess: data => {
        onSuccess && onSuccess(data);
        queryClient.invalidateQueries({
          predicate: query => query.queryKey[0] === 'department' && query.queryKey[1] === 'list'
        });
      },
      onError,
      onSettled
    }
  );

  const validationSchema = yup
    .object({
      firstName: yup.string().required(),
      lastName: yup.string().required()
    })
    .required();

  const form = useForm<FormValues>({
    defaultValues: {
      firstName: values.firstName,
      lastName: values.lastName
    },
    resolver: yupResolver<any>(validationSchema)
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

export default UpdateForm;
