// Dependencies
import React, { useState } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import useOnclickOutside from 'react-cool-onclickoutside';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Formik } from 'formik';
import { toast } from 'react-toastify';

// Services
import api from '~/services/api';

// Components
import Button from '~/components/Button';

// Styles
import * as S from '../styles';
import * as F from '~/styles/form';

// Color Schema
import colors from '~styles/colors';

export default function CreateIngredient({ open, handleClose, recipeId }) {
  // States
  const [loading, setLoading] = useState(false);
  const [opcional, setOpcional] = useState(false);

  // Validators
  const Schema = Yup.object().shape({
    name: Yup.string().required('Esse campo é obrigatório'),
    quantity: Yup.string(),
    unity: Yup.string(),
    cost: Yup.string(),
  });

  // Ref
  const ref = useOnclickOutside(() => {
    handleClose();
  });

  const createIngredient = async (values, { reset }) => {
    setLoading(true);

    try {
      const data = {
        name: values.name,
        quantity: `${values.quantity} ${values.unity}`,
        cost: values.cost,
        opcional,
        recipe_id: recipeId,
      };

      await api.post(`/ingredients`, data);
      handleClose();
      reset();
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
      <S.Content ref={ref}>
        <S.Header>
          <h2>Adicionar Ingrediente</h2>
          <button type="button" onClick={handleClose}>
            <S.IconClose />
          </button>
        </S.Header>
        <S.Body>
          <Formik
            initialValues={{
              name: '',
              quantity: '',
              unity: '',
              cost: '',
            }}
            validationSchema={Schema}
            onSubmit={createIngredient}
          >
            {({ values, handleChange, handleBlur, errors, touched }) => (
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
                      <option vlaue="kg">kg</option>
                      <option vlaue="g">g</option>
                      <option vlaue="L">L</option>
                      <option vlaue="un.">un.</option>
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
                    <input
                      id="cost"
                      name="cost"
                      type="text"
                      value={values.cost}
                      error={errors.cost}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.cost && touched.cost && <span>{errors.cost}</span>}
                  </F.Column>
                </F.Row>

                <FormControlLabel
                  control={
                    <Switch
                      checked={opcional}
                      onChange={e => setOpcional(e.target.checked)}
                      name="opcional"
                    />
                  }
                  label="Opcional"
                />

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
  recipeId: PropTypes.number,
};

// Default Props
CreateIngredient.defaultProps = {
  open: false,
  recipeId: null,
};
