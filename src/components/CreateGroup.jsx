import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { groupNameState } from '../state/groupName';

import { Button, Container, Form, Row } from 'react-bootstrap';
import { CenteredOverlayForm } from './CenteredOverlayForm';
import styled from 'styled-components';

export const CreateGroup = () => {
  const [validated, setValidated] = useState(false);
  const [validGroupName, setValidGroupName] = useState(false);
  const [groupName, setGroupName] = useRecoilState(groupNameState);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity()) {
      setValidGroupName(true);
    } else {
      event.stopPropagation();
      setValidGroupName(false);
    }
    setValidated(true);
  };

  return (
    <CenteredOverlayForm>
      <Container>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <StyledRow>
            <Row className='aligin-items-start'>
              <StyledH2>먼저, 더치페이 할 그룹의 이름을 정해볼까요?</StyledH2>
            </Row>
            <Row className='aligin-items-center'>
              <Form.Group controlId='validationGroupName'>
                <Form.Control
                  type='text'
                  placeholder='2023 제주도 여행'
                  onChange={(e) => setGroupName(e.target.value)}
                  required
                />
                <Form.Control.Feedback type='invalid' data-valid={validGroupName}>
                  그룹 이름을 입력해주세요.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className='aligin-items-end'>
              <StyledSubmitBtn>저장</StyledSubmitBtn>
            </Row>
          </StyledRow>
        </Form>
      </Container>
    </CenteredOverlayForm>
  );
};

const StyledRow = styled(Row)`
  height: 60vh;
  align-items: center;
  justify-content: center;
`;

const StyledH2 = styled.h2`
  font-weight: 700;
  line-height: 35px;
  text-align: right;
  word-break: keep-all;
`;

const StyledSubmitBtn = styled(Button).attrs({
  type: 'submit',
})`
  background-color: #6610f2;
  border: none;
  border-radius: 8px;

  padding: 0.75rem 1.25rem;

  &:hover {
    background-color: #6610f2;
    filter: brightness(80%);
  }
`;
