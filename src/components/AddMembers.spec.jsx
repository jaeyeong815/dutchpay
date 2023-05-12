import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RecoilRoot } from 'recoil';
import { AddMembers } from './AddMembers';

const renderComponent = () => {
  render(
    <RecoilRoot>
      <AddMembers />
    </RecoilRoot>
  );

  const input = screen.getByTestId('input-member-names');
  const saveBtn = screen.getByText('저장');

  return {
    input,
    saveBtn,
  };
};

describe('그룹 멤버 추가 페이지', () => {
  test('그룹 멤버 추가 컴포넌트가 렌더링 되는가', () => {
    const { input, saveBtn } = renderComponent();

    expect(input).not.toBeNull();
    expect(saveBtn).not.toBeNull();
  });

  test('그룹 멤버를 입력하지 않고 "저장" 버튼 클릭 시, 에러메시지 노출', async () => {
    const { saveBtn } = renderComponent();

    await userEvent.click(saveBtn);

    const errorMessage = await screen.findByText('그룹 멤버들의 이름을 입력해 주세요.');
    expect(errorMessage).toBeInTheDocument('data-valid', 'false');
  });

  test('그룹 멤버를 입력 후 "저장" 버튼클릭 시, 저장 성공', async () => {
    const { input, saveBtn } = renderComponent();

    await userEvent.type(input, '철수, 영희, 영수');
    await userEvent.click(saveBtn);

    const errorMessage = screen.queryByText('그룹 멤버들의 이름을 입력해 주세요.');
    expect(errorMessage).toBeNull();
  });
});
