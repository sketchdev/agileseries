import React from 'react';
import PropTypes from 'prop-types';
import './PageHeader.css';
import { Link } from 'react-router-dom';

const PageHeader = props => {
  return (
    <div className={'page-header'}>
      <div className={'title'}>
        <h1>{props.title}</h1>
        {props.tags ? (
          <div className={'tags'}>
            {Object.keys(props.tags).map(key => {
              return <Link to={props.tags[key].to} key={key}>{props.tags[key].title}</Link>;
            })}
          </div>
        ) : null}
      </div>
      <div className={'actions'}>
        {props.children ? <div>{props.children}</div> : null}
      </div>
    </div>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  tags: PropTypes.object,
};

export default PageHeader;
