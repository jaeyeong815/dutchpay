import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RecoilRoot } from 'recoil';
import { CreateGroup } from './CreateGroup';

const renderComponent = () => {
  render(
    <RecoilRoot>
      <CreateGroup />
    </RecoilRoot>
  );

  const input = screen.getByPlaceholderText('2023 제주도 여행');
  const saveBtn = screen.getByText('저장');
  const errorMessage = screen.queryByText('그룹 이름을 입력해주세요.');

  return {
    input,
    saveBtn,
    errorMessage,
  };
};

describe('그룹 생성 페이지', () => {
  test('그룹 이름 입력 컴포넌트가 렌더링 되는가', () => {
    const { input, saveBtn } = renderComponent();
    // todo: input 컴포넌트 렌더링
    expect(input).not.toBeNull();
    // todo: save 버튼 렌더링
    expect(saveBtn).not.toBeNull();
  });

  test('그룹명을 입력하지 않고 "저장" 버튼 클릭 시, 에러메시지 노출', async () => {
    const { saveBtn, errorMessage } = renderComponent();

    await userEvent.click(saveBtn);
    expect(errorMessage).not.toBeNull();
  });

  test('그룹명을 입력 후 "저장" 버튼클릭 시, 저장 성공', async () => {
    const { input, saveBtn, errorMessage } = renderComponent();

    await userEvent.type(input, '예시 그룹명');
    await userEvent.click(saveBtn);

    expect(errorMessage).toBeNull();
  });
});
