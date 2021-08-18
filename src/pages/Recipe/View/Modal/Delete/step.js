// Dependencies
import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';
import useOnclickOutside from 'react-cool-onclickoutside';
import { toast } from 'react-toastify';

// Services
import api from '~/services/api';

// Components
import Button from '~/components/Button';

// Styles
import * as S from '../styles';

// Color Schema
import colors from '~styles/colors';

export default function DeleteStep({ open, handleClose, stepId }) {
  // States
  const [step, setStep] = useState(null);
  const [loading, setLoading] = useState(false);

  // Ref
  const ref = useOnclickOutside(() => {
    handleClose();
  });

  const getStep = async () => {
    setLoading(true);
    setStep(null);

    try {
      const response = await api.get(`/steps/${stepId}`);
      setStep(response.data);
    } catch (err) {
      if (!err.response || err.response.data.error === undefined) {
        toast.error(`Um erro aconteceu, tente novamente mais tarde.`);
      } else {
        toast.error(`${err.response.data.error}`);
      }
    }

    setLoading(false);
  };

  const deleteStep = async () => {
    setLoading(true);

    try {
      await api.delete(`/steps/${stepId}`);
      handleClose();
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
    if (open && stepId) {
      getStep();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, stepId]);

  return (
    <S.Container
      isOpen={open}
      contentLabel="Viewer"
      ariaHideApp={false}
      // onAfterOpen={scrollToBottom}
    >
      <S.Content ref={ref}>
        {step ? (
          <>
            <S.Header>
              <h2>Etapa {step.order}</h2>
              <button type="button" onClick={handleClose}>
                <S.IconClose />
              </button>
            </S.Header>
            <S.Body>
              <strong>Tem certeza que deseja deletar a etapa?</strong>
            </S.Body>
            <S.Footer>
              <Button
                type="button"
                background={colors.tertiary}
                color="#333"
                loading={false}
                onClick={handleClose}
              >
                <strong>Cancelar</strong>
              </Button>

              <Button
                loading={loading}
                background={colors.warning}
                color="#fff"
                type="button"
                onClick={deleteStep}
              >
                <strong>Confirmar</strong>
              </Button>
            </S.Footer>
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
DeleteStep.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  stepId: PropTypes.number,
};

// Default Props
DeleteStep.defaultProps = {
  open: false,
  stepId: null,
};
