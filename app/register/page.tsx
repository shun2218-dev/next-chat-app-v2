'use client';
import React, { memo, FC, FormEvent, useEffect, useRef } from 'react';
import { usePage } from '@/hooks/usePage';
import { useSignUp } from '@/hooks/useSignUp';

import Button from '@/components/button';
import Form from '@/components/form';
import Input from '@/components/input';
import SignUpIcon from '@/icons/signUpIcon';
import SignInIcon from '@/icons/signInIcon';
import CheckInIcon from '@/icons/checkInIcon';
import { PageParam } from '@/types/PageParam';
import { AuthLayout } from '@/components/authLayout';

import styles from '@/styles/pages/Register.module.scss';

type Props = {
  params: PageParam;
};

const Register: FC<Props> = memo(function RegisterMemo({ params }) {
  const { toLogin, toUser } = usePage();
  const { signUp, loading, error } = useSignUp();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmationRef = useRef<HTMLInputElement>(null);

  const passwordValidate = (password: string, passwordConfirmation: string) => {
    if (password === passwordConfirmation) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const passwordConfirmation = passwordConfirmationRef.current?.value;
    if (email && password && passwordConfirmation) {
      if (passwordValidate(password, passwordConfirmation)) {
        signUp(email, password);
      }
    }
  };

  useEffect(() => {
    const id = params?.uid;
    if (id) {
      toUser(id);
    }
  }, [params?.uid, toUser]);

  return (
    <AuthLayout>
      <Form title="Sign Up" onSubmit={onSubmit} startIcon={<SignUpIcon title />} testid="register-form">
        <Input label="Email" type="email" placeholder="Email" required ref={emailRef} testid="email_register-form" />
        <Input
          label="Password"
          type="password"
          placeholder="Password"
          required
          ref={passwordRef}
          testid="password_register-form"
        />
        <Input
          label="Password Confirmation"
          type="password"
          placeholder="Password Confirmation"
          required
          ref={passwordConfirmationRef}
          testid="password-confirmation_register-form"
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          height="52px"
          margin="20px 0 0"
          startIcon={<CheckInIcon />}
          disabled={loading}
          testid="register-button"
        >
          Sign Up
        </Button>
        <div className={styles.buttonGroup}>
          <Button type="button" color="transparent" startIcon={<SignInIcon />} href="/login">
            Sign In
          </Button>
        </div>
      </Form>
    </AuthLayout>
  );
});

export default Register;
