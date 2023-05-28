import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../Api/Api';
import Searchbar from './Searchbar/Searchbar';
import Modal from './Modal/Modal';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import css from './App.module.css';

export class App extends Component {
  state = {
    status: 'idle',
    query: [],
    page: 1,
    name: '',
    modalAlt: '',
    showModal: false,
    modalImg: '',
    error: null,
    hideButton: false,
  };

  componentDidUpdate(_, prevState) {
    const { name, page } = this.state;

    if (prevState.name !== name) {
      this.setState({ query: [], status: 'pending' });
    }

    if (prevState.name !== name || prevState.page !== page) {
      API(name, page)
        .then(({ hits }) => {
          const images = hits.map(
            ({ id, webformatURL, largeImageURL, tags }) => ({
              id,
              webformatURL,
              largeImageURL,
              tags,
            })
          );

          if (images.length > 0) {
            this.setState(prevState => ({
              query: [...prevState.query, ...images],
              status: 'resolved',
            }));
          } else {
            toast.error(`Didn't find anything for the query: ${name}`);
            this.setState({ status: 'idle', hideButton: true });
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  handleSubmitInput = newQuery => {
    if (newQuery !== this.state.name) {
      this.setState({ name: newQuery, page: 1, status: 'pending' });
    }
  };

  handleClickImg = event => {
    const imgForModal = event.target.dataset.src;
    const altForModal = event.target.alt;
    this.setState({
      showModal: true,
      modalImg: imgForModal,
      modalAlt: altForModal,
    });
  };

  handleClickBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      status: 'pending',
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { query, showModal, modalImg, modalAlt, error, status, hideButton } =
      this.state;
    const hasMoreImages = query.length > 0;

    let content = null;

    if (status === 'idle') {
      content = (
        <>
          <div>
            <ToastContainer
              position="top-center"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </>
      );
    } else if (status === 'pending') {
      content = (
        <>
          <div>
            {hasMoreImages && <ImageGallery query={query} />}
            <Loader className={css.LoaderContainer} />
          </div>
        </>
      );
    } else if (status === 'rejected') {
      content = <h1>{error.message}</h1>;
    } else if (status === 'resolved') {
      content = (
        <>
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={modalImg} alt={modalAlt} />
            </Modal>
          )}
          <div>
            <ImageGallery
              onClickImg={this.handleClickImg}
              query={this.state.query}
            />
            <Button
              handleClickBtn={this.handleClickBtn}
              hidden={!hasMoreImages || hideButton}
            />
          </div>
        </>
      );
    }

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmitInput} />
        {content}
      </div>
    );
  }
}
