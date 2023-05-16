import { render, screen } from '@testing-library/react';

import { RecoilRoot } from 'recoil';
import { ExpenseMain } from './ExpenseMain';
import userEvent from '@testing-library/user-event';
import { groupMembersState } from '../state/groupMembers';

const renderComponent = () => {
  render(
    <RecoilRoot initializeState={(snap) => snap.set(groupMembersState, ['철수', '영희'])}>
      <ExpenseMain />
    </RecoilRoot>
  );

  const dateInput = screen.getByPlaceholderText(/결제한 날짜/i);
  const descInput = screen.getByPlaceholderText(/비용에 대한 설명/i);
  const amountInput = screen.getByPlaceholderText(/비용은 얼마/i);
  const payerInput = screen.getByDisplayValue(/누가 결제/i);

  const descErrorMessage = screen.getByText('비용 내용을 입력해 주셔야 합니다.');
  const payerErrorMessage = screen.getByText('결제자를 선택해 주셔야 합니다.');
  const amountErrorMessage = screen.getByText('1원 이상의 금액을 입력해 주셔야 합니다.');

  const addBtn = screen.getByText('추가하기');

  return {
    dateInput,
    descInput,
    amountInput,
    payerInput,
    addBtn,
    descErrorMessage,
    payerErrorMessage,
    amountErrorMessage,
  };
};

describe('비용 정산 메인 페이지', () => {
  describe('비용 추가 컴포넌트', () => {
    test('비용 추가 컴포넌트 렌더링', () => {
      const { dateInput, descInput, amountInput, payerInput, addBtn } = renderComponent();

      expect(dateInput).toBeInTheDocument();
      expect(descInput).toBeInTheDocument();
      expect(amountInput).toBeInTheDocument();
      expect(payerInput).toBeInTheDocument();
      expect(addBtn).toBeInTheDocument();
    });

    test('필수 입력값을 입력하지 않고 "추가" 버튼 클릭 시, 에러 메시지 노출', () => {
      const { addBtn, descErrorMessage, payerErrorMessage, amountErrorMessage } = renderComponent();

      expect(addBtn).toBeInTheDocument();
      userEvent.click(addBtn);

      expect(descErrorMessage).toHaveAttribute('data-valid', 'false');
      expect(payerErrorMessage).toHaveAttribute('data-valid', 'false');
      expect(amountErrorMessage).toHaveAttribute('data-valid', 'false');
    });

    test('필수 입력값을 입력 후 "추가" 버튼 클릭 시, 저장 성공', async () => {
      const {
        descInput,
        amountInput,
        payerInput,
        addBtn,
        descErrorMessage,
        payerErrorMessage,
        amountErrorMessage,
      } = renderComponent();

      await userEvent.type(descInput, '장보기');
      await userEvent.type(amountInput, '30000');
      await userEvent.selectOptions(payerInput, '영희');
      await userEvent.click(addBtn);

      expect(descErrorMessage).toHaveAttribute('data-valid', 'true');
      expect(payerErrorMessage).toHaveAttribute('data-valid', 'true');
      expect(amountErrorMessage).toHaveAttribute('data-valid', 'true');
    });
  });
});
