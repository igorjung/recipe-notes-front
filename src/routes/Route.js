// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

// Layouts
import DefaultLayout from '~/layouts/Default';
import AuthLayout from '~/layouts/Auth';

export default function RouteWrapper({
  component: Component,
  isPrivate = false,
  ...rest
}) {
  // States from Redux
  const signed = useSelector(state => state.auth.signed);
  const profile = useSelector(state => state.user.profile);

  // States
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  // Page Validation
  if (!signed && isPrivate) {
    return <Redirect to="/auth/signup" />;
  }

  // Setting Layout
  let Layout = DefaultLayout;

  if (isPrivate) {
    Layout = AuthLayout;
  }

  function resizePage() {
    setWindowSize(window.innerWidth);
  }

  // Resize event
  window.onresize = resizePage;

  return (
    <Route
      {...rest}
      render={props => (
        <Layout size={windowSize} user={profile}>
          <Component size={windowSize} {...props} />
        </Layout>
      )}
    />
  );
}

// Props
RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

// Default Props
RouteWrapper.defaultProps = {
  isPrivate: false,
};
