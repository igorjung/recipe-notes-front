// Dependencies
import React from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';

// Redux
import { updateProfileRequest } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';

// Styles
import * as S from './styles';
import * as F from '~/styles/form';

// Color Schema
import colors from '~styles/colors';

// Components
import Button from '~/components/Button';
import { Password } from '~/components/Input';

export default function Signup() {
  const dispatch = useDispatch();

  // States from Redux
  const { profile, loading } = useSelector(state => state.user);

  // Validators
  const Schema = Yup.object().shape({
    name: Yup.string(),
    email: Yup.string()
      .email('O email é invalido')
      .typeError('O email é invalido'),
    password: Yup.string().min(6),
    password_confirmation: Yup.string().when('password', (password, field) =>
      password ? field.oneOf([Yup.ref('password')]).required() : field
    ),
    old_password: Yup.string().when('password', (password, field) =>
      password ? field.required() : field
    ),
  });

  const PasswordSchema = Yup.object().shape({
    password: Yup.string().min(6),
    password_confirmation: Yup.string().when('password', (password, field) =>
      password ? field.oneOf([Yup.ref('password')]).required() : field
    ),
    old_password: Yup.string().when('password', (password, field) =>
      password ? field.required() : field
    ),
  });

  // Functions
  function handleSubmit(data) {
    const { id } = profile;
    dispatch(updateProfileRequest(data, id));
  }

  return (
    <S.Wrapper>
      <S.Container>
        <h1>Editar Usuário</h1>
        <Formik
          initialValues={{
            name: profile.name,
            email: profile.email,
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
                    <S.IconName />
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

        <S.Separator />

        <Formik
          initialValues={{
            password: '',
            password_confirmation: '',
            old_password: '',
          }}
          validationSchema={PasswordSchema}
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
                    <S.IconPassword />
                    <strong>Nova Senha</strong>
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
                    <S.IconPassword />
                    <strong>Confirmar Nova Senha</strong>
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

              <F.Row>
                <F.Column>
                  <label>
                    <S.IconPassword />
                    <strong>Senha Anterior</strong>
                  </label>
                  <Password
                    name="old_password"
                    value={values.old_password}
                    error={errors.old_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.old_password && touched.old_password && (
                    <span>{errors.old_password}</span>
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
                <Button
                  loading={false}
                  background={colors.warning}
                  color="#fff"
                  type="button"
                  onClick={() => dispatch(signOut())}
                >
                  <strong>Sair</strong>
                </Button>
              </F.Footer>
            </F.Container>
          )}
        </Formik>
      </S.Container>
    </S.Wrapper>
  );
}
