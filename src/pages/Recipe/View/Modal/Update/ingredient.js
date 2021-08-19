// Dependencies
import React, { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
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

// Color Schema
import colors from '~styles/colors';

export default function CreateIngredient({
  open,
  handleClose,
  handleRefresh,
  ingredientId,
}) {
  // States
  const [ingredient, setIngredient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState(null);

  // Validators
  const Schema = Yup.object().shape({
    name: Yup.string().required('Esse campo é obrigatório'),
    quantity: Yup.string(),
    unity: Yup.string(),
    cost: Yup.string(),
  });

  const getIgredient = async () => {
    setLoading(true);
    setIngredient(null);

    try {
      const response = await api.get(`/ingredients/${ingredientId}`);
      setIngredient(response.data);

      const ingredientData = response.data;
      let quantity = '';
      let unity = '';

      if (ingredientData.quantity) {
        const splits = ingredientData.quantity.split(' ');
        unity = splits[splits.length - 1];

        splits.splice(splits.length - 1, 1);
        quantity = splits.join('.');
      }

      setInitialValue({
        name: ingredientData.name || '',
        quantity,
        unity,
        cost: ingredientData.cost || '',
        opcional: ingredientData.opcional || false,
      });
    } catch (err) {
      if (!err.response || err.response.data.error === undefined) {
        toast.error(`Um erro aconteceu, tente novamente mais tarde.`);
      } else {
        toast.error(`${err.response.data.error}`);
      }
    }

    setLoading(false);
  };

  const createIngredient = async (values, { resetForm }) => {
    setLoading(true);

    try {
      const data = {
        name: values.name,
        quantity: `${values.quantity} ${values.unity}`,
        cost: values.cost,
        opcional: values.opcional,
      };

      await api.put(`/ingredients/${ingredientId}`, data);
      handleRefresh();
      resetForm();
      setInitialValue(null);
      setIngredient(null);
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
    if (open && ingredientId) {
      getIgredient();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, ingredientId]);

  return (
    <S.Container
      isOpen={open}
      contentLabel="UpdateIngredient"
      ariaHideApp={false}
    >
      <S.Content>
        {ingredient && initialValue ? (
          <>
            <S.Header>
              <h2>Editando Ingrediente</h2>
              <button type="button" onClick={handleClose}>
                <S.IconClose />
              </button>
            </S.Header>
            <S.Body>
              <Formik
                initialValues={initialValue || {}}
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
                    </F.Row>

                    <F.Row columns={2}>
                      <F.Column>
                        <label>
                          <S.IconName />
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
                          <S.IconName />
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
                        </select>
                        {errors.unity && touched.unity && (
                          <span>{errors.unity}</span>
                        )}
                      </F.Column>
                    </F.Row>

                    <F.Row>
                      <F.Column>
                        <label>
                          <S.IconName />
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
                        {errors.cost && touched.cost && (
                          <span>{errors.cost}</span>
                        )}
                      </F.Column>
                    </F.Row>

                    <F.Row>
                      <F.Column>
                        <label>
                          <S.IconName />
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

                        {errors.cost && touched.cost && (
                          <span>{errors.cost}</span>
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
CreateIngredient.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  handleRefresh: PropTypes.func.isRequired,
  ingredientId: PropTypes.number,
};

// Default Props
CreateIngredient.defaultProps = {
  open: false,
  ingredientId: null,
};
