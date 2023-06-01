import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { API } from 'aws-amplify';

import { groupNameState } from '../state/groupName';
import { groupIdState } from '../state/groupId';
import { groupMembersState } from '../state/groupMembers';
import { expensesState } from '../state/expenses';

export const useGroupData = () => {
  const { guid } = useParams();

  const [groupId, setGroupId] = useRecoilState(groupIdState);
  const [groupName, setGroupName] = useRecoilState(groupNameState);
  const [groupMembers, setGroupMembers] = useRecoilState(groupMembersState);
  const [expenses, setExpenses] = useRecoilState(expensesState);

  const fetchAndSetGroupData = () => {
    API.get('groupsApi', `/groups/${guid}`)
      .then(({ data }) => {
        setGroupId(data.guid);
        setGroupName(data.groupName);
        setGroupMembers(data.members);
        setExpenses(data.expenses || []);
      })
      .catch((error) => {
        alert('데이터를 불러오는데 실패했습니다.');
        console.log(error);
      });
  };

  useEffect(() => {
    if (guid?.length > 0) {
      fetchAndSetGroupData();
    }
  }, [guid]);

  return {
    groupId,
    groupName,
    groupMembers,
    expenses,
  };
};
