import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = props => {
  const attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses[1] = classes.Open;
  }

  return (
    <>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')}>
        <Logo height="11%" />
        <nav style={{ marginTop: '32px' }}>
          <NavigationItems />
        </nav>
      </div>
    </>
  );
};

export default SideDrawer;
