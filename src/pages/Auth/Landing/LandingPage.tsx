import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';
import Spinner from 'antd/lib/spin';

import { Login as LoginForm } from '@/modules/auth/forms';
import { useLogin } from '@/modules/auth/hooks';

import Spacer from '@/components/Spacer';
import Splash from '@/components/Splash';

import Form from './components/Form';

import classes from './LandingPage.module.scss';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const { isFetched, fetchStatus } = useLogin();

  if (!isFetched && fetchStatus === 'fetching') {
    return <Splash />;
  }

  return (
    <div className={classes.wrapper}>
      <Spacer size={24} />
      <LoginForm
        onSuccess={() => {
          message.success("login muffaqiyatli bo'ldi");
          navigate(`/`);
        }}
      >
        {({ formState }) => (
          <div className={classes.content}>
            <Spinner spinning={formState.isSubmitSuccessful}>
              <Form />
              <Button type={'primary'} disabled={formState.isSubmitSuccessful} htmlType="submit">
                submit
              </Button>
            </Spinner>
          </div>
        )}
      </LoginForm>
    </div>
  );
};

export default LandingPage;
