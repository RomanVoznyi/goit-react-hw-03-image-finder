import React, { Component } from 'react';
import s from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.checkEvent);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.checkEvent);
  }

  checkEvent = evt => {
    if (evt.key === 'Escape' || evt.target === evt.currentTarget) {
      this.props.toggleModal({ status: false });
    }
  };

  render() {
    const { src, alt } = this.props;

    return (
      <div className={s.Overlay} onClick={this.checkEvent}>
        <div className={s.Modal}>
          <img className={s.img} src={src} alt={alt} />
        </div>
      </div>
    );
  }
}

export default Modal;
