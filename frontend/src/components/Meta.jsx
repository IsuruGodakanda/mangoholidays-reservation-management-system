import React from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, authUser } = auth;

  return (
    <Helmet>
      <title>
        Welcome To Mangoholidays
        {title ? ` | ${title}` : ''}
      </title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: '',
  description: 'We sell the best products for cheap',
  keywords: 'electronics, buy electronics, cheap electroincs'
};

export default Meta;
