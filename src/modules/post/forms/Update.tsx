import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UseFormReturn } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

import * as Api from '../api.ts';
import { LIST } from '../constants.ts';
import * as Mappers from '../mappers.ts';
import * as Types from '../types';

interface FormValues extends Types.IForm.Update {}

interface IChildren extends UseFormReturn<FormValues> {}

interface IProps {
  id: string;
  values: Types.IEntity.Post;
  children: (props: IChildren) => React.ReactNode;
  className?: string;
  onError?: (error: string) => void;
  onSettled?: () => void;
  onSuccess?: (value: Types.IEntity.Post) => void;
}

const UpdateForm: React.FC<IProps> = ({ children, values, className, onSettled, onSuccess, onError, id }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<Types.IEntity.Post, string, FormValues, any>(
    async values => {
      const { data } = await Api.Update({ id, values });
      return Mappers.Post(data);
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
      body: yup.string().required()
    })
    .required();

  const form = useForm<FormValues>({
    defaultValues: {
      title: values.title,
      body: values.body
    },
    resolver: yupResolver<any>(validationSchema)
  });

  const onSubmit = form.handleSubmit(values => {
    mutation.mutate(values);
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
