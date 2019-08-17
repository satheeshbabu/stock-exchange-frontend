import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Span from 'components/atoms/Span/Span';
import Button from 'components/atoms/Button/Button';
import moment from 'moment';
import unicodes from 'constants/unicodes';
import { stylizeNumber } from 'utils/format';
import { deleteTransactionAction } from 'actions/deleteTransaction';

const DescriptionTerm = styled.dt`
  background-color: ${({ theme }) => (theme.quaternary)};
  cursor: pointer;
  font-weight: ${({ theme }) => (theme.bold)};
  transition: .7s ease;
  display: grid;
  padding: 5px 0;
  grid-template-columns: 1fr 3fr 16fr repeat(3, 1fr);
  
  &:hover {
    background-color: ${({ theme }) => (theme.tertiary)};
    transition: .3s ease;
  }
`;

const DescriptionDetails = styled.dd`
  overflow: auto;
  max-height: 0;
  margin: 0;
  padding: 0;
  transition: max-height .7s;
  background-color: ${({ theme }) => (theme.quaternary)};
  display: grid;
  grid-template-columns: 1fr 3fr 4fr 1fr 3fr 4fr 1fr 3fr repeat(3, 1fr);
  
  &.expanded {
     max-height: 31px;
  }
`;

function Row(props) {
  const {
    title, expanded, onClick, transactions, deleteTransaction,
  } = props;

  return (
    <>
      <DescriptionTerm onClick={onClick}>
        <Span />
        <Span>{title}</Span>
        <Span right primary>
          {stylizeNumber(transactions.reduce((sum, t) => (t.priceSale - t.pricePurchase) + sum, 0), 'PLN')}
        </Span>
        <Span />
        <Span center>{transactions.length}</Span>
        <Span />
      </DescriptionTerm>
      {transactions.sort((a, b) => new Date(a.datePurchase) - new Date(b.datePurchase))
        .map(transaction => (
          <DescriptionDetails className={expanded ? 'expanded' : ''} key={transaction._id}>
            <Span />
            <Span right primary>{stylizeNumber((transaction.pricePurchase * (-1)), 'PLN')}</Span>
            <Span center>{moment(transaction.datePurchase).format('L')}</Span>
            <Span />
            <Span right primary>{stylizeNumber(transaction.priceSale, 'PLN')}</Span>
            <Span center>{moment(transaction.dateSale).format('L')}</Span>
            <Span />
            <Span right primary>
              {stylizeNumber((transaction.priceSale - transaction.pricePurchase), 'PLN')}
            </Span>
            <Span />
            <Button column onClick={() => deleteTransaction(transaction._id)}>
              {unicodes.cross}
            </Button>
            <Span />
          </DescriptionDetails>
        ))}
    </>
  );
}

Row.propTypes = {
  title: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  deleteTransaction: PropTypes.func.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    datePurchase: PropTypes.string.isRequired,
    pricePurchase: PropTypes.number.isRequired,
    dateSale: PropTypes.string.isRequired,
    priceSale: PropTypes.number.isRequired,
  })).isRequired,
};

const mapDispatchToProps = dispatch => ({
  deleteTransaction: id => dispatch(deleteTransactionAction(id)),
});

export default connect(null, mapDispatchToProps)(Row);
