/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List } from './styles';

export default class Main extends Component {
  state = { newRepo: '', repositories: [], loading: false, error: false };

  componentDidMount() {
    const savedRepositories = localStorage.getItem('aghrp:repositories');

    if (savedRepositories) {
      this.setState({ repositories: JSON.parse(savedRepositories) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('aghrp:repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    const { newRepo, repositories } = this.state;

    try {
      if (
        repositories.find(
          repo => repo.name.toLowerCase() === newRepo.trim().toLowerCase()
        )
      ) {
        throw new Error('Duplicated repo');
      }

      const response = await api.get(`/repos/${newRepo.trim()}`);

      const data = { name: response.data.full_name };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        error: false,
      });
    } catch (err) {
      this.setState({ error: true });
    }

    this.setState({ loading: false });
  };

  render() {
    const { newRepo, repositories, loading, error } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositories
        </h1>

        <Form onSubmit={this.handleSubmit} hasError={error}>
          <label htmlFor="repository-input">Repository name</label>
          <input
            id="repository-input"
            type="text"
            placeholder="Add repository"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton isLoading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map(repo => (
            <li key={repo.name}>
              <span>{repo.name}</span>
              <Link to={`/repository/${encodeURIComponent(repo.name)}`}>
                Details
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
