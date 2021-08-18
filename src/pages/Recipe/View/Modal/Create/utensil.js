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

export default function CreateUtensil({ open, handleClose, recipeId }) {
  // States
  const [loading, setLoading] = useState(false);
  const [opcional, setOpcional] = useState(false);

  // Validators
  const Schema = Yup.object().shape({
    name: Yup.string().required('Esse campo é obrigatório'),
  });

  // Ref
  const ref = useOnclickOutside(() => {
    handleClose();
  });

  const createUtensil = async (values, { reset }) => {
    setLoading(true);

    try {
      const data = {
        name: values.name,
        opcional,
        recipe_id: recipeId,
      };

      await api.post(`/utensils`, data);
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
    <S.Container isOpen={open} contentLabel="CreateUtensil" ariaHideApp={false}>
      <S.Content ref={ref}>
        <S.Header>
          <h2>Adicionar Etapa</h2>
          <button type="button" onClick={handleClose}>
            <S.IconClose />
          </button>
        </S.Header>
        <S.Body>
          <Formik
            initialValues={{
              name: '',
            }}
            validationSchema={Schema}
            onSubmit={createUtensil}
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
CreateUtensil.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  recipeId: PropTypes.number,
};

// Default Props
CreateUtensil.defaultProps = {
  open: false,
  recipeId: null,
};
