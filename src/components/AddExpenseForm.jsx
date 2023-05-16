import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Button, Form } from 'react-bootstrap';

import { groupMembersState } from '../state/groupMembers';
import { expensesState } from '../state/expenses';

export const AddExpenseForm = () => {
  const members = useRecoilValue(groupMembersState);
  const setExpense = useSetRecoilState(expensesState);

  const today = new Date();
  const [date, setDate] = useState(
    [today.getFullYear(), today.getMonth() + 1, today.getDate()].join('-')
  );
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState(0);
  const [payer, setPayer] = useState(null);

  const [isDescValid, setIsDescValid] = useState(false);
  const [isAmountValid, setIsAmountValid] = useState(false);
  const [isPayerValid, setIsPayerValid] = useState(false);
  const [validated, setValidated] = useState(false);

  const checkFormValidity = () => {
    const descValid = desc.length > 0;
    const amountValid = amount > 0;
    const payerValid = payer !== null;

    setIsDescValid(descValid);
    setIsAmountValid(amountValid);
    setIsPayerValid(payerValid);

    return descValid && amountValid && payerValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (checkFormValidity()) {
      const newExpense = { date, desc, amount, payer };
      setExpense((prev) => [...prev, newExpense]);
    }

    console.log(isDescValid);
    setValidated(true);
  };
  return (
    <>
      <Form noValidate onSubmit={handleSubmit}>
        <h3>1. 비용 추가하기</h3>
        <Form.Group>
          <Form.Control
            type='date'
            placeholder='결제한 날짜를 선택해 주세요'
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type='text'
            placeholder='비용에 대한 설명을 입력해 주세요'
            isValid={isDescValid}
            isInvalid={!isDescValid && validated}
            value={desc}
            onChange={({ target }) => setDesc(target.value)}
          />
          <Form.Control.Feedback type='invalid' data-valid={isDescValid}>
            비용 내용을 입력해 주셔야 합니다.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type='number'
            placeholder='비용은 얼마였나요?'
            isValid={isAmountValid}
            isInvalid={!isAmountValid && validated}
            value={amount}
            onChange={({ target }) => setAmount(target.value)}
          />
          <Form.Control.Feedback type='invalid' data-valid={isAmountValid}>
            1원 이상의 금액을 입력해 주셔야 합니다.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Select
            defaultValue=''
            isValid={isPayerValid}
            isInvalid={!isPayerValid && validated}
            onChange={({ target }) => setPayer(target.value)}
          >
            <option disabled value=''>
              누가 결제했나요?
            </option>
            {members?.map((member) => (
              <option key={member} value={member}>
                {member}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type='invalid' data-valid={isPayerValid}>
            결제자를 선택해 주셔야 합니다.
          </Form.Control.Feedback>
        </Form.Group>
        <Button type='submit'>추가하기</Button>
      </Form>
    </>
  );
};
