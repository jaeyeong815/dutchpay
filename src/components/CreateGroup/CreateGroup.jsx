import { Form } from "react-bootstrap";

import useCreateGroup from "./useCreateGroup";
import { CenteredOverlayForm } from "../shared/CenteredOverlayForm";

const CreateGroup = () => {
  const { validated, validGroupName, onGroupNameChange, onSubmit } =
    useCreateGroup();

  return (
    <CenteredOverlayForm
      title={"먼저, 더치페이 할 그룹의 이름을 정해볼까요?"}
      validated={validated}
      handleSubmit={onSubmit}
    >
      <Form.Group controlId="validationGroupName">
        <Form.Control
          type="text"
          placeholder="2023 제주도 여행"
          onChange={onGroupNameChange}
          required
        />
        <Form.Control.Feedback type="invalid" data-valid={validGroupName}>
          그룹 이름을 입력해주세요.
        </Form.Control.Feedback>
      </Form.Group>
    </CenteredOverlayForm>
  );
};

export default CreateGroup;
