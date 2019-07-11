import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner, IssueList, IssueFilter } from './styles';

const issueStates = [
  { state: 'all', label: 'All', active: true },
  { state: 'open', label: 'Open', active: false },
  { state: 'closed', label: 'Closed', active: false },
];

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    filterIndex: 0,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { filterIndex } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [repo, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      this.loadIssues(repoName, issueStates[filterIndex].state),
    ]);

    this.setState({
      repository: repo.data,
      issues: issues.data,
      loading: false,
    });
  }

  loadIssues = async (repoName, state) => {
    return api.get(`/repos/${repoName}/issues`, {
      params: { state, per_page: 5, page: 1 },
    });
  };

  handleFilterClick = async filterIndex => {
    const { repository } = this.state;

    this.setState({ filterIndex });
    const issues = await this.loadIssues(
      repository.full_name,
      issueStates[filterIndex].state
    );

    this.setState({ issues: issues.data });
  };

  render() {
    const { repository, issues, loading, filterIndex } = this.state;

    if (loading) return <Loading>Loading...</Loading>;

    return (
      <Container>
        <Owner>
          <Link to="/">Back to repositories</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueList>
          <IssueFilter active={filterIndex}>
            {issueStates.map((filter, index) => (
              <button
                type="button"
                key={filter.label}
                onClick={() => this.handleFilterClick(index)}
              >
                {filter.label}
              </button>
            ))}
          </IssueFilter>

          {issues.map(issue => (
            <li key={issue.id.toString()}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={label.id.toString()}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    );
  }
}
