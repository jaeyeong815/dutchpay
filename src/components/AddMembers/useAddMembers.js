import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { API } from "aws-amplify";

import { ROUTE_UTILS } from "../../routes";
import { useGroupData } from "../../hooks/useGroupData";
import { groupMembersState } from "../../state/groupMembers";

const useAddMembers = () => {
  const navigate = useNavigate();
  const { groupId, groupMembers } = useGroupData();
  const [validated, setValidated] = useState(false);
  const setGroupMembers = useSetRecoilState(groupMembersState);

  const saveGroupMembers = () => {
    API.put("groupsApi", `/groups/${groupId}/members`, {
      body: {
        members: groupMembers,
      },
    })
      .then((res) => {
        navigate(ROUTE_UTILS.EXPENSE_MAIN(groupId));
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.error);
      });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValidated(true);
    if (groupMembers.length > 0) {
      saveGroupMembers();
    }
  };

  return {
    validated,
    setGroupMembers,
    onSubmit,
  };
};

export default useAddMembers;
