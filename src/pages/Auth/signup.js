// Dependencies
import React from 'react';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';

// Redux
import { signUpRequest } from '~/store/modules/auth/actions';

// Styles
import * as S from './styles';
import * as F from '~/styles/form';
import * as I from '~/styles/icons';

// Color Schema
import colors from '~/styles/colors';

// Components
import Button from '~/components/Button';
import { Password } from '~/components/Input';

export default function User() {
  const dispatch = useDispatch();

  // States from Redux
  const loading = useSelector(state => state.auth.loading);

  // Validators
  const Schema = Yup.object().shape({
    name: Yup.string().required('Esse campo é obrigatório'),
    email: Yup.string()
      .email('Insira um e-mail válido')
      .required('Esse campo é obrigatório'),
    password: Yup.string()
      .min(6, 'Senha deve ter pelo menos 6 digitos')
      .typeError('Senha é obrigatória.')
      .required('Senha é obrigatória.'),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password')], 'As senhas não são iguais.')
      .typeError('As senhas não são iguais.')
      .required('As senhas não são iguais.'),
  });

  // Functions
  function handleSubmit(data) {
    dispatch(signUpRequest(data));
  }

  return (
    <S.Wrapper>
      <S.Container>
        <S.Logo>
          <strong>Recipe</strong>
          <p>Notes</p>
        </S.Logo>
        <h1>Criar uma conta</h1>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
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
                    <I.IconEdit />
                    <strong>Nome</strong>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={values.name}
                    error={errors.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.name && touched.name && <span>{errors.name}</span>}
                </F.Column>
              </F.Row>

              <F.Row>
                <F.Column>
                  <label>
                    <I.IconEmail />
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
                    <I.IconPassword />
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

              <F.Row>
                <F.Column>
                  <label>
                    <I.IconPassword />
                    <strong>Confirmar Senha</strong>
                  </label>
                  <Password
                    name="password_confirmation"
                    value={values.password_confirmation}
                    error={errors.password_confirmation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password_confirmation &&
                    touched.password_confirmation && (
                      <span>{errors.password_confirmation}</span>
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
          <p>Já tem uma conta?</p>
          <Link to="/auth/signin">Fazer Login</Link>
        </S.Footer>
      </S.Container>
    </S.Wrapper>
  );
}
