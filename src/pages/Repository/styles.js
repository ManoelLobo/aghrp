import styled from 'styled-components';

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  color: #fff;
  font-size: 30px;
  font-weight: bold;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #506688;
    line-height: 1.4;
    text-align: center;
    max-width: 420px;
  }

  a {
    color: #3ebd93;
    font-size: 16px;
    text-decoration: none;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #9fb3c8;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #9fb3c8;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #9fb3c8;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #102b44;

          &:hover {
            color: #3ebd93;
          }
        }

        span {
          background: #9fb3c8;
          color: #102b44;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #809ab0;
      }
    }
  }
`;
