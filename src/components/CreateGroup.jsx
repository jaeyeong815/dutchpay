import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { groupNameState } from '../state/groupName';

import { Form } from 'react-bootstrap';
import { CenteredOverlayForm } from './shared/CenteredOverlayForm';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes';

export const CreateGroup = () => {
  const [validated, setValidated] = useState(false);
  const [validGroupName, setValidGroupName] = useState(false);
  const setGroupName = useSetRecoilState(groupNameState);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity()) {
      setValidGroupName(true);
      navigate(ROUTES.ADD_MEMBERS);
    } else {
      event.stopPropagation();
      setValidGroupName(false);
    }
    setValidated(true);
  };

  return (
    <CenteredOverlayForm
      title={'먼저, 더치페이 할 그룹의 이름을 정해볼까요?'}
      validated={validated}
      handleSubmit={handleSubmit}
    >
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
    </CenteredOverlayForm>
  );
};
