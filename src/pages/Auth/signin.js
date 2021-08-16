// Dependencies
import React from 'react';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';

// Redux
import { signInRequest } from '~/store/modules/auth/actions';

// Styles
import * as S from './styles';
import * as F from '~/styles/form';

// Color Schema
import colors from '~/styles/colors';

// Components
import Button from '~/components/Button';
import { Password } from '~/components/Input';

export default function Signin() {
  const dispatch = useDispatch();

  // States from Redux
  const loading = useSelector(state => state.auth.loading);

  // Validators
  const Schema = Yup.object().shape({
    email: Yup.string()
      .email('Insira um e-mail válido')
      .required('Esse campo é obrigatório'),
    password: Yup.string().required('Senha é obrigatória.'),
  });

  // Functions
  function handleSubmit(data) {
    dispatch(signInRequest(data));
  }

  return (
    <S.Wrapper>
      <S.Container>
        <S.Logo>
          <strong>Recipe</strong>
          <p>Notes</p>
        </S.Logo>
        <h1>Fazer login</h1>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={Schema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            handleChange,
            handleBlur,
            errors,
            touched,
            handleReset,
          }) => (
            <F.Container>
              <F.Row>
                <F.Column>
                  <label>
                    <S.IconEmail />
                    <strong>E-mail</strong>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    value={values.email}
                    error={errors.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email && <span>{errors.email}</span>}
                </F.Column>
              </F.Row>

              <F.Row>
                <F.Column>
                  <label>
                    <S.IconPassword />
                    <strong>Senha</strong>
                  </label>
                  <Password
                    name="password"
                    value={values.password}
                    error={errors.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password && (
                    <span>{errors.password}</span>
                  )}
                </F.Column>
              </F.Row>

              <F.Footer>
                <Button
                  loading={false}
                  background="#ddd"
                  color="#666"
                  type="button"
                  onClick={handleReset}
                >
                  <strong>Limpar</strong>
                </Button>
                <Button
                  loading={loading}
                  background={colors.secondary}
                  color="#fff"
                  type="submit"
                >
                  <strong>Confirmar</strong>
                </Button>
              </F.Footer>
            </F.Container>
          )}
        </Formik>
        <S.Footer>
          <p>Não tem conta ainda?</p>
          <Link to="/auth/signup">Criar conta</Link>
        </S.Footer>
      </S.Container>
    </S.Wrapper>
  );
}
