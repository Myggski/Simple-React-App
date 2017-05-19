import React from 'react';
import { Route} from 'react-router';
import PropTypes from 'prop-types';

const Status = ({ code, children }) => (
  <Route render={({ staticContext }) => {
    if (staticContext) {
      staticContext.status = code;
    }
    return children;
  }}/>
);

const ErrorPage = ({code, errorText}) => (
  <Status code={code}>
    <div>
      <h1>{errorText}</h1>
    </div>
  </Status>
);

export default ErrorPage;

Status.propTypes = {
  code: PropTypes.number.isRequired,
  children: PropTypes.any
};

ErrorPage.propTypes = {
  code: PropTypes.number.isRequired,
  errorText: PropTypes.string.isRequired
};

ErrorPage.defaultProps = {
  code: 404,
  errorText: '404 Page Not Found'
};
