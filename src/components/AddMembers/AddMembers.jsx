import { Row } from "react-bootstrap";
import styled from "styled-components";
import { InputTags } from "react-bootstrap-tagsinput";

import { useGroupData } from "../../hooks/useGroupData";
import { CenteredOverlayForm } from "../shared/CenteredOverlayForm";
import useAddMembers from "./useAddMembers";

const AddMembers = () => {
  const { groupName, groupMembers } = useGroupData();
  const { validated, setGroupMembers, onSubmit } = useAddMembers();

  return (
    <CenteredOverlayForm
      title={`${groupName || ""} 그룹에 속한 사람들의 이름을 모두 적어 주세요.`}
      validated={validated}
      handleSubmit={onSubmit}
    >
      <Row>
        <InputTags
          values={groupMembers}
          data-testid="input-member-names"
          placeholder="이름 간 띄어쓰기"
          onTags={(value) => setGroupMembers(value.values)}
        />
        {validated && groupMembers.length === 0 && (
          <StyledErrorMessage>
            그룹 멤버들의 이름을 입력해 주세요.
          </StyledErrorMessage>
        )}
      </Row>
    </CenteredOverlayForm>
  );
};

export default AddMembers;

const StyledErrorMessage = styled.span`
  color: red;
`;
