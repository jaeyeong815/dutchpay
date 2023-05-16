import { AddExpenseForm } from './AddExpenseForm';

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
        {/* Todo: 비용 리스트 컴포넌트 렌더링 */}
      </div>
    </div>
  );
};
