import React from 'react';
import PropTypes from 'prop-types';
import './TabControl.css';

const TabControl = props => {
  return (
    <div className={'tab-control'}>
      <ul className={'list'}>
        {Object.keys(props.tabs).map(key => {
          return <li onClick={() => props.onChange(key)} className={key === props.activeTab ? 'tab -active' : 'tab'} key={key}>{props.tabs[key].title}</li>;
        })}
      </ul>
      {Object.keys(props.tabs).map(key => {
        return <div className={key === props.activeTab ? 'content -active' : 'content'} key={key}>{props.tabs[key].content}</div>;
      })}
    </div>
  );
};

TabControl.propTypes = {
  activeTab: PropTypes.string.isRequired,
  tabs: PropTypes.objectOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.element.isRequired,
  })).isRequired,
  onChange: PropTypes.func.isRequired
};

export default TabControl;
