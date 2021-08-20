// Dependencies
import React, { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { toast } from 'react-toastify';

// Services
import api from '~/services/api';

// Components
import { MoneyInput } from '~/components/Input';
import Button from '~/components/Button';

// Styles
import * as S from '../styles';
import * as F from '~/styles/form';

// Color Schema
import colors from '~styles/colors';

export default function UpdateRecipe({
  open,
  handleClose,
  handleRefresh,
  recipeId,
}) {
  // States
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  // Validators
  const Schema = Yup.object().shape({
    name: Yup.string().required('Esse campo é obrigatório'),
    description: Yup.string(),
    category: Yup.string(),
    preparation_time: Yup.string(),
    financial_cost: Yup.string(),
  });

  const getRecipe = async () => {
    setLoading(true);
    setRecipe(null);

    try {
      const response = await api.get(`/recipes/${recipeId}`);
      setRecipe(response.data);
    } catch (err) {
      if (!err.response || err.response.data.error === undefined) {
        toast.error(`Um erro aconteceu, tente novamente mais tarde.`);
      } else {
        toast.error(`${err.response.data.error}`);
      }
    }

    setLoading(false);
  };

  const updateRecipe = async (values, { resetForm }) => {
    setLoading(true);

    try {
      const data = {
        name: values.name,
        description: values.description,
        category: values.category,
        preparation_time: values.preparation_time,
        financial_cost: values.financial_cost,
      };

      await api.put(`/recipes/${recipeId}`, data);
      handleRefresh();
      resetForm();
      setRecipe(null);
    } catch (err) {
      if (!err.response || err.response.data.error === undefined) {
        toast.error(`Um erro aconteceu, tente novamente mais tarde.`);
      } else {
        toast.error(`${err.response.data.error}`);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    if (open && recipeId) {
      getRecipe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, recipeId]);

  return (
    <S.Container isOpen={open} contentLabel="UpdateRecipe" ariaHideApp={false}>
      <S.Content>
        {recipe ? (
          <>
            <S.Header>
              <h2>Editar Receita</h2>
              <button type="button" onClick={handleClose}>
                <S.IconClose />
              </button>
            </S.Header>
            <S.Body>
              <Formik
                initialValues={{
                  name: recipe.name || '',
                  description: recipe.description || '',
                  category: recipe.category || '',
                  preparation_time: recipe.preparation_time || '',
                  financial_cost: recipe.financial_cost || '',
                }}
                validationSchema={Schema}
                onSubmit={updateRecipe}
              >
                {({ values, handleChange, handleBlur, errors, touched }) => (
                  <F.Container>
                    <F.Row columns={2}>
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
                        {errors.name && touched.name && (
                          <span>{errors.name}</span>
                        )}
                      </F.Column>

                      <F.Column>
                        <label>
                          <S.IconName />
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
                        </select>
                        {errors.category && touched.category && (
                          <span>{errors.category}</span>
                        )}
                      </F.Column>
                    </F.Row>

                    <F.Row columns={2}>
                      <F.Column>
                        <label>
                          <S.IconName />
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
                        {errors.preparation_time &&
                          touched.preparation_time && (
                            <span>{errors.preparation_time}</span>
                          )}
                      </F.Column>

                      <F.Column>
                        <label>
                          <S.IconName />
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
                          <S.IconName />
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
                        loading={false}
                        background={colors.tertiary}
                        color="#333"
                        type="button"
                        onClick={handleClose}
                      >
                        <strong>Cancelar</strong>
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
            </S.Body>
          </>
        ) : (
          <ReactLoading
            type="spin"
            color={colors.secondary}
            height={20}
            width={20}
          />
        )}
      </S.Content>
    </S.Container>
  );
}

// Props
UpdateRecipe.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  handleRefresh: PropTypes.func.isRequired,
  recipeId: PropTypes.number,
};

// Default Props
UpdateRecipe.defaultProps = {
  open: false,
  recipeId: null,
};
