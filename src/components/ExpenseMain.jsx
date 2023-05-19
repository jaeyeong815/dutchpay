import { AddExpenseForm } from './AddExpenseForm';
import { ExpenseTable } from './ExpenseTable';

export const ExpenseMain = () => {
  return (
    <div>
      Create ExpenseMain Component
      {/* Left pane */}
      <div>
        {/* Todo: 더치페이 헤더 렌더링 */}
        <AddExpenseForm />
        {/* Todo: 정산 결과 컴포넌트 렌더링 */}
      </div>
      {/* Right pane */}
      <div>
        {/* Todo: 그룹명 헤더 렌더링 */}
        <ExpenseTable />
      </div>
    </div>
  );
};
