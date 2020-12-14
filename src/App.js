import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import fetchImage from './Services/apiService';
import Searchbar from './Components/Searchbar';
import ImageGallery from './Components/ImageGallery';
import Notify from './Components/Notify';
import Modal from './Components/Modal';
import Button from './Components/Button';
import s from './App.module.css';

class App extends Component {
  state = {
    images: [],
    totalHits: 0,
    searchQuery: '',
    page: 1,
    isLoading: false,
    error: null,
    notify: false,
    message: '',
    showPopup: false,
    showButton: false,
    targetImage: null,
  };

  componentDidMount() {
    this.searchImages();
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery) {
      this.searchImages(searchQuery, 1);
      this.setState({ page: 1 });
    }
    if (prevState.page !== page) {
      this.searchImages(searchQuery, page);
    }
  }

  searchImages(searchQuery = '', page = 1) {
    if (searchQuery !== '') {
      this.setState({
        isLoading: true,
        notify: false,
      });

      fetchImage(searchQuery, page)
        .then(data => {
          if (page === 1) {
            this.setState({
              totalHits: data.totalHits,
              images: data.hits,
            });
          } else {
            this.setState(prevState => ({
              images: [...prevState.images, ...data.hits],
            }));
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
            });
          }
          this.checkButtonAndNotify();
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ isLoading: false }));
    } else {
      this.setState({
        images: [],
        showButton: false,
        message: 'Please input search request',
        notify: true,
      });
    }
  }

  onSubmit = value => {
    this.setState({ searchQuery: value });
  };

  onButtonMoreClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  checkButtonAndNotify = () => {
    const { totalHits, images } = this.state;

    if (totalHits > images.length) {
      this.setState({ showButton: true });
    } else {
      this.setState({ showButton: false });
    }

    if (!totalHits) {
      this.setState({
        message: 'Nothing was found. Try again.',
        notify: true,
      });
    } else {
      this.setState({ notify: false });
    }
  };

  toggleModal = ({ status, src, alt }) => {
    if (status) {
      this.setState({
        targetImage: { src, alt },
        showPopup: true,
      });
    } else {
      this.setState({
        targetImage: null,
        showPopup: false,
      });
    }
  };

  render() {
    const {
      images,
      isLoading,
      error,
      notify,
      message,
      showPopup,
      targetImage,
      showButton,
    } = this.state;

    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.onSubmit} />
        {error && <Notify message={`Something wrong: ${error.message}`} />}
        {isLoading && (
          <Loader type="Circles" color="#00BFFF" height={80} width={80} />
        )}
        {images.length > 0 && (
          <ImageGallery images={images} toggleModal={this.toggleModal} />
        )}
        {notify && <Notify message={message} />}
        {showPopup && (
          <Modal
            src={targetImage.src}
            alt={targetImage.alt}
            toggleModal={this.toggleModal}
          />
        )}
        {showButton && <Button onClick={this.onButtonMoreClick} />}
      </div>
    );
  }
}

export default App;
