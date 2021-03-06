import React from 'react';
import styled from 'styled-components';
import Online from 'components/templates/Online';
import Header from 'components/atoms/Header';
import Details from 'components/molecules/Details';

const Wrapper = styled.div`
  margin-left: 125px;
  padding: 0 0 1vh 3vw;
`;

const Article = props => (
  <Online>
    <Wrapper>
      <Header>Your article</Header>
      <Details type="articles" {...props} />
    </Wrapper>
  </Online>
);

export default Article;
