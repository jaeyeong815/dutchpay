import { RecoilRoot } from 'recoil';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ExpenseMain } from './ExpenseMain';
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

  describe('비용 리스트 컴포넌트', () => {
    test('비용 리스트 컴포넌트가 렌더링 되는가?', () => {
      renderComponent();

      const expenseListComponent = screen.getByTestId('expenseList');
      expect(expenseListComponent).toBeInTheDocument();
    });
  });

  describe('정산 결과 컴포넌트', () => {
    test('정산 결과 컴포넌트가 렌더링 되는가?', () => {
      renderComponent();
      const component = screen.getByText(/정산은 이렇게/i);
      expect(component).toBeInTheDocument();
    });

    describe('새로운 비용이 입력 되었을 때,', () => {
      const addNewExpense = async () => {
        const { dateInput, descInput, amountInput, payerInput, addBtn } = renderComponent();
        await userEvent.type(dateInput, '2023-04-22');
        await userEvent.type(descInput, '장보기');
        await userEvent.type(amountInput, '30000');
        await userEvent.selectOptions(payerInput, '철수');
        await userEvent.click(addBtn);
      };

      test('날짜, 내용, 결제자, 금액 데이터가 정산 리스트에 추가 된다.', async () => {
        await addNewExpense();

        const expenseListComponent = screen.getByTestId('expenseList');

        const dateValue = within(expenseListComponent).getByText('2023-04-22');
        expect(dateValue).toBeInTheDocument();

        const descValue = within(expenseListComponent).getByText('장보기');
        expect(descValue).toBeInTheDocument();

        const amountValue = within(expenseListComponent).getByText('30,000 원');
        expect(amountValue).toBeInTheDocument();

        const payerValue = within(expenseListComponent).getByText('철수');
        expect(payerValue).toBeInTheDocument();
      });

      test('정산 결과도 업데이트 된다.', async () => {
        await addNewExpense();

        const totalText = screen.getByText(/2 명이 총 30,000 원 지출/i);
        expect(totalText).toBeInTheDocument();

        const transactionText = screen.getByText(/영희: 철수에게 15,000원/i);
        expect(transactionText).toBeInTheDocument();
      });
    });
  });
});
