import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { API } from "aws-amplify";

import { ROUTE_UTILS } from "../../routes";
import { groupIdState } from "../../state/groupId";
import { groupNameState } from "../../state/groupName";

const useCreateGroup = () => {
  const navigate = useNavigate();
  const setGroupId = useSetRecoilState(groupIdState);
  const [groupName, setGroupName] = useRecoilState(groupNameState);
  const [validated, setValidated] = useState(false);
  const [validGroupName, setValidGroupName] = useState(false);

  const onSave = () => {
    API.post("groupsApi", "/groups", {
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

  const onSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      setValidGroupName(true);
      onSave();
    } else {
      event.stopPropagation();
      setValidGroupName(false);
    }
    setValidated(true);
  };

  return {
    validated,
    validGroupName,
    onGroupNameChange: (event) => setGroupName(event.target.value),
    onSubmit,
  };
};

export default useCreateGroup;
