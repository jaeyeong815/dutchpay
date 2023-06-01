import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { API } from 'aws-amplify';
import { Row } from 'react-bootstrap';
import styled from 'styled-components';
import { InputTags } from 'react-bootstrap-tagsinput';

import { ROUTE_UTILS } from '../routes';
import { CenteredOverlayForm } from './shared/CenteredOverlayForm';
import { groupMembersState } from '../state/groupMembers';
import { groupNameState } from '../state/groupName';
import { groupIdState } from '../state/groupId';

export const AddMembers = () => {
  const [groupMembers, setGroupMembers] = useRecoilState(groupMembersState);
  const groupName = useRecoilValue(groupNameState);
  const guid = useRecoilValue(groupIdState);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const saveGroupMembers = () => {
    API.put('groupsApi', `/groups/${guid}/members`, {
      body: {
        members: groupMembers,
      },
    })
      .then((res) => {
        navigate(ROUTE_UTILS.EXPENSE_MAIN(guid));
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidated(true);
    if (groupMembers.length > 0) {
      saveGroupMembers();
    }
  };

  return (
    <CenteredOverlayForm
      title={`${groupName} 그룹에 속한 사람들의 이름을 모두 적어 주세요.`}
      validated={validated}
      handleSubmit={handleSubmit}
    >
      <Row>
        <InputTags
          data-testid='input-member-names'
          placeholder='이름 간 띄어쓰기'
          onTags={(value) => setGroupMembers(value.values)}
        />
        {validated && groupMembers.length === 0 && (
          <StyledErrorMessage>그룹 멤버들의 이름을 입력해 주세요.</StyledErrorMessage>
        )}
      </Row>
    </CenteredOverlayForm>
  );
};

const StyledErrorMessage = styled.span`
  color: red;
`;
