import { useRecoilValue } from 'recoil';
import { expensesState } from '../state/expenses';
import { groupMembersState } from '../state/groupMembers';

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

  const minimumTransactions = calculateMinimumTransaction(expenses, members, splitAmount);
  return (
    <div>
      <h3>2. 정산은 이렇게!</h3>
      {totalExpenseAmount > 0 && groupMembersCount > 0 && (
        <>
          <span>
            {groupMembersCount} 명이 총 {totalExpenseAmount} 원 지출
          </span>
          <br />
          <span>한 사람 당 {splitAmount} 원</span>
          <ul>
            {minimumTransactions.map((transaction, idx) => (
              <li key={`transaction-${idx}`}>
                <span>
                  {transaction.sender}가 {transaction.receiver}에게 {transaction.amount} 원 보내기
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
