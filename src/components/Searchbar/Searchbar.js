import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { IconContext } from 'react-icons';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleInputChange = e => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.query.trim() === '') {
      toast.warning('Enter your search query');
      return;
    }
    this.props.onSubmit(this.state.query.trim().toLowerCase());
    this.reset();
  };

  reset = () => {
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.searchForm_button}>
            <IconContext.Provider value={{ size: '1.5em' }}>
              <div>
                <FaSearch />
              </div>
            </IconContext.Provider>
            <span className={css.searchForm_button_label}>Search</span>
          </button>
          <input
            onInput={this.handleInputChange}
            className={css.searchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
