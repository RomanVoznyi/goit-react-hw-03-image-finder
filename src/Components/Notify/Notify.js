import React from 'react';
import s from './Notify.module.css';

const Notify = ({ message }) => {
  return <p className={s.Notify}>{message}</p>;
};

export default Notify;
