export const calculateMinimumTransaction = (
  expenses,
  members,
  amountPerPerson
) => {
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

  return minimumTransactions.filter(
    ({ receiver, sender }) => receiver !== sender
  );
};
