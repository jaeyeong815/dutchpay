import { render, screen } from '@testing-library/react';

import { RecoilRoot } from 'recoil';
import { ExpenseMain } from './ExpenseMain';
import userEvent from '@testing-library/user-event';

const renderComponent = () => {
  render(
    <RecoilRoot>
      <ExpenseMain />
    </RecoilRoot>
  );

  const dateInput = screen.getByPlaceholderText(/결제한 날짜/i);
  const descInput = screen.getByPlaceholderText(/비용에 대한 설명/i);
  const amountInput = screen.getByPlaceholderText(/비용은 얼마/i);
  const payerInput = screen.getByDisplayValue(/누가 결제/i);
  const addBtn = screen.getByText('추가하기');

  return {
    dateInput,
    descInput,
    amountInput,
    payerInput,
    addBtn,
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
      const { addBtn } = renderComponent();

      expect(addBtn).toBeInTheDocument();
      userEvent.click(addBtn);

      const descErrorMessage = screen.getByText('비용 내용을 입력해 주셔야 합니다.');
      expect(descErrorMessage).toHaveAttribute('data-valid', 'false');

      const payerErrorMessage = screen.getByText('결제자를 선택해 주셔야 합니다.');
      expect(payerErrorMessage).toHaveAttribute('data-valid', 'false');

      const amountErrorMessage = screen.getByText('금액을 입력해 주셔야 합니다.');
      expect(amountErrorMessage).toHaveAttribute('data-valid', 'false');
    });

    test('필수 입력값을 입력 후 "추가" 버튼 클릭 시, 저장 성공', () => {
      const { descInput, amountInput, payerInput, addBtn } = renderComponent();

      userEvent.type(descInput, '장보기');
      userEvent.type(amountInput, '30000');
      userEvent.selectOptions(payerInput, '철수'); // 테스트 돌리기 전 payerList(멤버들 이름)을 셋업해야 함
      userEvent.click(addBtn);

      const descErrorMessage = screen.queryByText('비용 내용을 입력해 주셔야 합니다.');
      expect(descErrorMessage).toHaveAttribute('data-valid', 'true');

      const payerErrorMessage = screen.queryByText('결제자를 선택해 주셔야 합니다.');
      expect(payerErrorMessage).toHaveAttribute('data-valid', 'true');

      const amountErrorMessage = screen.queryByText('금액을 입력해 주셔야 합니다.');
      expect(amountErrorMessage).toHaveAttribute('data-valid', 'true');
    });
  });
});
