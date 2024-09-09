import React from 'react';

import * as Fields from '@/containers/Fields';

import Spacer from '@/components/Spacer';

interface IProps {}

const Form: React.FC<IProps> = () => {
  return (
    <>
      <Fields.Text name={'username'} title={'username'} placeholder={'username'} size={'sm'} />
      <Spacer size={24} />
      <Fields.Text name={'password'} title={'password'} placeholder={'password'} size={'sm'} />
      <Spacer size={24} />
    </>
  );
};

export default Form;
