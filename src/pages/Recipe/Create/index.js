// Dependencies
import React, { useState } from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import { toast } from 'react-toastify';

// Redux
import { fetchRecipesRequest } from '~/store/modules/recipe/actions';

// Services
import api from '~/services/api';
import history from '~/services/history';

// Components
import { MoneyInput } from '~/components/Input';
import Button from '~/components/Button';

// Styles
import * as S from './styles';
import * as F from '~/styles/form';
import * as I from '~/styles/icons';

// Color Schema
import colors from '~styles/colors';

export default function CreateRecipe() {
  const dispatch = useDispatch();

  // States from Redux
  const profile = useSelector(state => state.user.profile);

  // States
  const [loading, setLoading] = useState(false);

  // Validators
  const Schema = Yup.object().shape({
    name: Yup.string().required('Esse campo é obrigatório'),
    description: Yup.string(),
    category: Yup.string().required('Esse campo é obrigatório'),
    preparation_time: Yup.string(),
    financial_cost: Yup.string(),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);

    try {
      const data = {
        name: values.name,
        description: values.description,
        category: values.category,
        preparation_time: values.preparation_time,
        financial_cost: values.financial_cost,
        user_id: profile.id,
      };

      const response = await api.post(`/recipes`, data);
      dispatch(fetchRecipesRequest(`?user_id=${profile.id}`));
      history.push(`/recipes/${response.data.id}`);
      resetForm();
    } catch (err) {
      if (!err.response || err.response.data.error === undefined) {
        toast.error(`Um erro aconteceu, tente novamente mais tarde.`);
      } else {
        toast.error(`${err.response.data.error}`);
      }
    }

    setLoading(false);
  };

  return (
    <S.Container>
      <S.Header>
        <h2>Cadastro de Receita</h2>
      </S.Header>
      <S.Body>
        <Formik
          initialValues={{
            name: '',
            description: '',
            category: '',
            preparation_time: '',
            financial_cost: '',
          }}
          validationSchema={Schema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, errors, touched }) => (
            <F.Container>
              <F.Row columns={2}>
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

                <F.Column>
                  <label>
                    <I.IconCategory />
                    <strong>Categoria</strong>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={values.category}
                    error={errors.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option vlaue="" />
                    <option vlaue="Lanche.">Lanche</option>
                    <option vlaue="Refeição">Refeição</option>
                    <option vlaue="Sobremesa">Sobremesa</option>
                    <option vlaue="Outo">Outo</option>
                  </select>
                  {errors.category && touched.category && (
                    <span>{errors.category}</span>
                  )}
                </F.Column>
              </F.Row>

              <F.Row columns={2}>
                <F.Column>
                  <label>
                    <I.IconTime />
                    <strong>Tempo de preparo</strong>
                  </label>
                  <input
                    id="preparation_time"
                    name="preparation_time"
                    type="text"
                    value={values.preparation_time}
                    error={errors.preparation_time}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.preparation_time && touched.preparation_time && (
                    <span>{errors.preparation_time}</span>
                  )}
                </F.Column>

                <F.Column>
                  <label>
                    <I.IconCost />
                    <strong>Custo</strong>
                  </label>
                  <MoneyInput
                    id="financial_cost"
                    name="financial_cost"
                    value={values.financial_cost}
                    error={errors.financial_cost}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.financial_cost && touched.financial_cost && (
                    <span>{errors.financial_cost}</span>
                  )}
                </F.Column>
              </F.Row>

              <F.Row>
                <F.Column>
                  <label>
                    <I.IconEdit />
                    <strong>Descrição</strong>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    type="text"
                    value={values.description}
                    error={errors.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.description && touched.description && (
                    <span>{errors.description}</span>
                  )}
                </F.Column>
              </F.Row>

              <F.Footer>
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
      </S.Body>
    </S.Container>
  );
}
