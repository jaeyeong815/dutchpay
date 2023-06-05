import { useRecoilValue } from 'recoil';
import { toPng } from 'html-to-image';
import styled from 'styled-components';

import { expensesState } from '../state/expenses';
import { groupMembersState } from '../state/groupMembers';
import { amountFormatting } from '../amountFormatting';

import * as Icon from 'react-bootstrap-icons';

const calculateMinimumTransaction = (expenses, members, amountPerPerson) => {
  const minimumTransactions = [];

  if (amountPerPerson === 0) return minimumTransactions;

  const membersToPay = {};
  members.forEach((member) => (membersToPay[member] = amountPerPerson));
  expenses.forEach(({ payer, amount }) => (membersToPay[payer] -= amount));
  const sortedMembersToPay = Object.keys(membersToPay)
    .map((member) => ({ member: member, amount: membersToPay[member] }))
    .sort((a, b) => a.amount - b.amount);

  let left = 0;
  let right = sortedMembersToPay.length - 1;

  while (left < right) {
    while (left < right && sortedMembersToPay[left].amount === 0) {
      left++;
    }
    while (left < right && sortedMembersToPay[right].amount === 0) {
      right--;
    }

    const toReceive = sortedMembersToPay[left];
    const toSend = sortedMembersToPay[right];
    const amountToReceive = Math.abs(toReceive.amount);
    const amountToSend = Math.abs(toSend.amount);

    if (amountToReceive < amountToSend) {
      minimumTransactions.push({
        receiver: toReceive.member,
        sender: toSend.member,
        amount: amountToReceive,
      });

      toReceive.amount = 0;
      toSend.amount -= amountToReceive;
      left++;
    } else {
      minimumTransactions.push({
        receiver: toReceive.member,
        sender: toSend.member,
        amount: amountToSend,
      });
      toSend.amount = 0;
      toReceive.amount -= amountToSend;
      right--;
    }
  }

  return minimumTransactions;
};

export const SettlementSummary = () => {
  const expenses = useRecoilValue(expensesState);
  const members = useRecoilValue(groupMembersState);
  const totalExpenseAmount = expenses.reduce(
    (prevAmount, curAmount) => +prevAmount + +curAmount.amount,
    0
  );
  const groupMembersCount = members.length;
  const splitAmount = totalExpenseAmount / groupMembersCount;

  const exportToPng = (e) => {
    if (minimumTransactions.length === 0) {
      alert('비용을 추가해주세요!');
      return;
    }

    toPng(e.currentTarget.parentNode, {
      filter: (node) => node.tagName !== 'BUTTON',
    })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'settlement-summary.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => console.log(err));
  };

  const minimumTransactions = calculateMinimumTransaction(expenses, members, splitAmount);
  return (
    <StyledWrapper className='position-relative'>
      <SytledExportBtn data-testid='btn-download' onClick={exportToPng}>
        <Icon.Download size={20} />
      </SytledExportBtn>
      <StyledTitle>2. 정산은 이렇게!</StyledTitle>
      {totalExpenseAmount > 0 && groupMembersCount > 0 && (
        <>
          <StyledSummary color='royalblue' size={96}>
            <span>
              {groupMembersCount} 명이 총 {amountFormatting(totalExpenseAmount)} 원 지출
            </span>
            <br />
            <span>한 사람 당 {amountFormatting(splitAmount)} 원</span>
          </StyledSummary>
          <StyledUl>
            {minimumTransactions.map((transaction, idx) => (
              <li key={`transaction-${idx}`}>
                <span>
                  {transaction.sender}: {transaction.receiver}에게{' '}
                  {amountFormatting(transaction.amount)}원 보내기
                </span>
              </li>
            ))}
          </StyledUl>
        </>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  align-items: center;
  flex-direction: column;
  display: flex;
  padding: 50px;

  background-color: #683ba1;
  border-radius: 15px;
  box-shadow: 3px 0px 4px rgba(0, 0, 0, 0.25);
  color: #fffbfb;
  font-size: 20px;
  text-align: center;
`;

const StyledTitle = styled.h3`
  font-size: 40px;
  font-weight: 700;
  letter-spacing: 0.25px;
  margin-bottom: 15px;
`;

const SytledExportBtn = styled.button`
  position: absolute;
  top: 0.625rem;
  right: 1.25rem;
  background-color: transparent;
  color: #fffbfb;
  border: none;

  &:hover {
    color: #683ba1;
    filter: brightness(20%);
  }
`;

const StyledUl = styled.ul`
  font-weight: 500;
  margin-top: 31px;
  line-height: 150%;
  list-style-type: square;
`;

const StyledSummary = styled.div`
  margin-top: 31px;
`;
