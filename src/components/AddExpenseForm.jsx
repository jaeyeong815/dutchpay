import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Button, Col, Form, Row } from 'react-bootstrap';

import { groupMembersState } from '../state/groupMembers';
import { expensesState } from '../state/expenses';

export const AddExpenseForm = () => {
  const members = useRecoilValue(groupMembersState);
  const setExpense = useSetRecoilState(expensesState);

  const today = new Date();
  const [date, setDate] = useState(
    [
      today.getFullYear(),
      `0${today.getMonth() + 1}`.slice(-2),
      `0${today.getDate()}`.slice(-2),
    ].join('-')
  );
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState(undefined);
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
    setValidated(true);
  };

  return (
    <StyledWrapper>
      <Form noValidate onSubmit={handleSubmit}>
        <StyledTitle>1. 비용 추가하기</StyledTitle>
        <Row>
          <Col xs={12}>
            <StyledFormGroup>
              <Form.Control
                type='date'
                placeholder='결제한 날짜를 선택해 주세요'
                value={date}
                onChange={({ target }) => setDate(target.value)}
              />
            </StyledFormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <StyledFormGroup>
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
            </StyledFormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={6}>
            <StyledFormGroup>
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
            </StyledFormGroup>
          </Col>
          <Col xs={12} lg={6}>
            <StyledFormGroup>
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
            </StyledFormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className='d-grid gap-2'>
            <StyleSubmitBtn>추가하기</StyleSubmitBtn>
          </Col>
        </Row>
      </Form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  padding: 50px;
  background-color: #683ba1;
  border-radius: 15px;
  box-shadow: 3px 0px 4px rgba(0, 0, 0, 0.25);
`;

const StyledFormGroup = styled(Form.Group)`
  margin-bottom: 18px;

  input,
  select {
    background-color: #59359a;
    border-radius: 8px;
    border: none;
    color: #f8f9fa;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    height: 45px;

    &:focus {
      color: #f8f9fa;
      background-color: #59359a;
      filter: brightness(80%);
    }

    ::placeholder {
      color: #f8f9fa;
    }
  }
`;

const StyleSubmitBtn = styled(Button).attrs({ type: 'submit' })`
  height: 60px;
  border: none;
  border-radius: 8px;
  background-color: #e2d9f3;
  color: #59359a;
  margin-top: 18px;

  &:hover,
  &:focus {
    background-color: #e2d9f3;
    filter: brightness(90%);
  }
`;

const StyledTitle = styled.h3`
  color: #fffbfb;
  text-align: center;
  font-size: 40px;
  font-weight: 700;
  letter-spacing: 0.25px;
  margin-bottom: 15px;
`;
