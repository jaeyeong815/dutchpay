import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Col, Container, Row } from 'react-bootstrap';
import { groupNameState } from '../state/groupName';
import { AddExpenseForm } from './AddExpenseForm';
import { ExpenseTable } from './ExpenseTable';

export const ExpenseMain = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={12} sm={5} md={4}>
          <LeftPane />
        </Col>
        <Col>
          <RightPane />
        </Col>
      </Row>
    </Container>
  );
};

const LeftPane = () => (
  <Container>
    {/* Todo: 더치페이 헤더 렌더링 */}
    <AddExpenseForm />
    {/* Todo: 정산 결과 컴포넌트 렌더링 */}
  </Container>
);
const RightPane = () => {
  const groupName = useRecoilValue(groupNameState);
  return (
    <StyledContainer>
      <Row>
        <StyledGroupName>{groupName || '그룹 이름'}</StyledGroupName>
      </Row>
      <ExpenseTable />
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  padding: 100px 31px;
`;

const StyledGroupName = styled.h2`
  margin-bottom: 80px;
  text-align: center;
  font-weight: 700;
  font-size: 48px;
`;
