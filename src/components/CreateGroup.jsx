import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { API } from 'aws-amplify';
import { Form } from 'react-bootstrap';

import { ROUTE_UTILS } from '../routes';
import { CenteredOverlayForm } from './shared/CenteredOverlayForm';
import { groupNameState } from '../state/groupName';
import { groupIdState } from '../state/groupId';

export const CreateGroup = () => {
  const [validated, setValidated] = useState(false);
  const [validGroupName, setValidGroupName] = useState(false);
  const [groupName, setGroupName] = useRecoilState(groupNameState);
  const setGroupId = useSetRecoilState(groupIdState);
  const navigate = useNavigate();

  const saveGroupName = () => {
    API.post('groupsApi', '/groups', {
      body: {
        groupName,
      },
    })
      .then(({ data }) => {
        const { guid } = data;
        setGroupId(guid);
        navigate(ROUTE_UTILS.ADD_MEMBERS(guid));
      })
      .catch((error) => {
        console.error(error);
        alert(error.response.data.error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      setValidGroupName(true);
      saveGroupName();
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
