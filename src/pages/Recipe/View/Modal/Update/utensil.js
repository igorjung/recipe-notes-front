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
import Button from '~/components/Button';

// Styles
import * as S from '../styles';
import * as F from '~/styles/form';

// Color Schema
import colors from '~styles/colors';

export default function UpdateUtensil({
  open,
  handleClose,
  handleRefresh,
  utensilId,
}) {
  // States
  const [utensil, setUtensil] = useState(null);
  const [loading, setLoading] = useState(false);

  // Validators
  const Schema = Yup.object().shape({
    name: Yup.string().required('Esse campo é obrigatório'),
  });

  const getUtensil = async () => {
    setLoading(true);
    setUtensil(null);

    try {
      const response = await api.get(`/utensils/${utensilId}`);
      setUtensil(response.data);
    } catch (err) {
      if (!err.response || err.response.data.error === undefined) {
        toast.error(`Um erro aconteceu, tente novamente mais tarde.`);
      } else {
        toast.error(`${err.response.data.error}`);
      }
    }

    setLoading(false);
  };

  const updateUtensil = async (values, { resetForm }) => {
    setLoading(true);

    try {
      const data = {
        name: values.name,
        opcional: values.opcional,
      };

      await api.put(`/utensils/${utensilId}`, data);
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

  useEffect(() => {
    if (open && utensilId) {
      getUtensil();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, utensilId]);

  return (
    <S.Container isOpen={open} contentLabel="UpdateUtensil" ariaHideApp={false}>
      <S.Content>
        {utensil ? (
          <>
            <S.Header>
              <h2>Editar Utensílio</h2>
              <button type="button" onClick={handleClose}>
                <S.IconClose />
              </button>
            </S.Header>
            <S.Body>
              <Formik
                initialValues={{
                  name: utensil.name || '',
                  opcional: utensil.opcional || false,
                }}
                validationSchema={Schema}
                onSubmit={updateUtensil}
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
UpdateUtensil.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  handleRefresh: PropTypes.func.isRequired,
  utensilId: PropTypes.number,
};

// Default Props
UpdateUtensil.defaultProps = {
  open: false,
  utensilId: null,
};
