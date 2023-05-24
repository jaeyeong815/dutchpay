import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Table } from 'react-bootstrap';
import { expensesState } from '../state/expenses';
import { amountFormatting } from '../amountFormatting';
import { OverlayWrapper } from './shared/OverlayWrapper';

export const ExpenseTable = () => {
  const expenses = useRecoilValue(expensesState);
  return (
    <OverlayWrapper minHeight={'73vh'}>
      <Table data-testid='expenseList' borderless hover responsive>
        <StyledThead>
          <tr>
            <th>날짜</th>
            <th>내용</th>
            <th>결제자</th>
            <th>금액</th>
          </tr>
        </StyledThead>
        <StyledTbody>
          {expenses.map(({ date, desc, amount, payer }, idx) => (
            <tr key={`expense-${idx}`}>
              <td>{date}</td>
              <td>{desc}</td>
              <td>{payer}</td>
              <td>{amountFormatting(parseInt(amount))} 원</td>
            </tr>
          ))}
        </StyledTbody>
      </Table>
    </OverlayWrapper>
  );
};

const StyledThead = styled.thead`
  color: #6b3da6;
  text-align: center;
  font-weight: 700;
  font-size: 24px;
`;

const StyledTbody = styled.tbody`
  td {
    text-align: center;
    font-weight: 400;
    font-size: 24px;
  }
`;
