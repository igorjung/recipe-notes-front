// Dependencies
import React, { useState } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import Switch from 'react-switch';

// Services
import api from '~/services/api';

// Components
import { MoneyInput } from '~/components/Input';
import Button from '~/components/Button';

// Styles
import * as S from '../styles';
import * as F from '~/styles/form';
import * as I from '~/styles/icons';

// Color Schema
import colors from '~styles/colors';

export default function CreateIngredient({
  open,
  handleClose,
  handleRefresh,
  recipeId,
}) {
  // States
  const [loading, setLoading] = useState(false);

  // Validators
  const Schema = Yup.object().shape({
    name: Yup.string().required('Esse campo é obrigatório'),
    quantity: Yup.string(),
    unity: Yup.string(),
    cost: Yup.string(),
  });

  const createIngredient = async (values, { resetForm }) => {
    setLoading(true);

    try {
      const data = {
        name: values.name,
        quantity: `${values.quantity} ${values.unity}`,
        cost: values.cost,
        opcional: values.opcional,
        recipe_id: recipeId,
      };

      await api.post(`/ingredients`, data);
      handleRefresh();
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
    <S.Container
      isOpen={open}
      contentLabel="CreateIngredient"
      ariaHideApp={false}
    >
      <S.Content>
        <S.Header>
          <h2>Adicionar Ingrediente</h2>
          <button type="button" onClick={handleClose}>
            <I.IconClose size={24} />
          </button>
        </S.Header>
        <S.Body>
          <Formik
            initialValues={{
              name: '',
              quantity: '',
              unity: '',
              cost: '',
              opcional: false,
            }}
            validationSchema={Schema}
            onSubmit={createIngredient}
          >
            {({
              values,
              handleChange,
              handleBlur,
              setFieldValue,
              errors,
              touched,
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

                <F.Row columns={2}>
                  <F.Column>
                    <label>
                      <I.IconWeight />
                      <strong>Quantidade</strong>
                    </label>
                    <input
                      id="quantity"
                      name="quantity"
                      type="text"
                      value={values.quantity}
                      error={errors.quantity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.quantity && touched.quantity && (
                      <span>{errors.quantity}</span>
                    )}
                  </F.Column>

                  <F.Column>
                    <label>
                      <I.IconUnity />
                      <strong>Unidade</strong>
                    </label>
                    <select
                      id="unity"
                      name="unity"
                      value={values.unity}
                      error={errors.unity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option vlaue="" />
                      <option vlaue="un.">un.</option>
                      <option vlaue="mL">mL</option>
                      <option vlaue="L">L</option>
                      <option vlaue="g">g</option>
                      <option vlaue="kg">kg</option>
                      <option vlaue="colher(sopa)">colher(sopa)</option>
                    </select>
                    {errors.unity && touched.unity && (
                      <span>{errors.unity}</span>
                    )}
                  </F.Column>
                </F.Row>

                <F.Row>
                  <F.Column>
                    <label>
                      <I.IconCost />
                      <strong>Custo</strong>
                    </label>
                    <MoneyInput
                      id="cost"
                      name="cost"
                      value={values.cost}
                      error={errors.cost}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.cost && touched.cost && <span>{errors.cost}</span>}
                  </F.Column>
                </F.Row>

                <F.Row>
                  <F.Column>
                    <label>
                      <I.IconSwitch />
                      <strong>Opcional</strong>
                    </label>
                    <Switch
                      onChange={e => {
                        setFieldValue('opcional', e);
                      }}
                      checked={values.opcional || false}
                      onColor={colors.secondary}
                      offColor={colors.tertiary}
                    />

                    {errors.cost && touched.cost && <span>{errors.cost}</span>}
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
      </S.Content>
    </S.Container>
  );
}

// Props
CreateIngredient.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  handleRefresh: PropTypes.func.isRequired,
  recipeId: PropTypes.number,
};

// Default Props
CreateIngredient.defaultProps = {
  open: false,
  recipeId: null,
};
