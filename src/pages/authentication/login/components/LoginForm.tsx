//import React, { useEffect, useState } from 'react';
import { schema } from '../schema/login_schema';
import { FormTemplate } from '../../../../components/form/login-form-template/form-template';
import { ComponentMapper } from './ComponentMapper';
import { validatorMapper } from './validator-mapper';
import { checkMFA, saveProfile } from '../../../../store/features/auth';
import { useDispatch } from 'react-redux';
import useDynamicTitle from '../../../../hooks/dynamic-title/useDynamicTitle';
import { useNavigate } from 'react-router';
import { FormRenderer } from '@data-driven-forms/react-form-renderer';
import { startLoader } from 'store/features/loader';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useDynamicTitle();


  return (
    <>
      <FormRenderer
        schema={schema}
        initialValues={{
          username: "abhishek.sahu@paymentoptions.com.sg",
          password: "Test12345678@#",
        }}
        FormTemplate={FormTemplate}
        validatorMapper={validatorMapper}
        componentMapper={ComponentMapper}
        onSubmit={values => {
          dispatch(startLoader());
          const internvalUser = values.username?.includes('@paymentoptions.com');
          if (internvalUser) {
            dispatch(checkMFA({ values, navigate }));
          } else {
            dispatch(saveProfile(values));
          }
        }}
      />
    </>
  );
};

export default LoginForm;
