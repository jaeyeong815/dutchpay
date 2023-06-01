import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Col, Container, Row } from 'react-bootstrap';

import { groupNameState } from '../state/groupName';
import { ServiceLogo } from './shared/ServiceLogo';
import { AddExpenseForm } from './AddExpenseForm';
import { ExpenseTable } from './ExpenseTable';
import { SettlementSummary } from './SettlementSummary';
import { useGroupData } from '../hooks/useGroupData';

export const ExpenseMain = () => {
  useGroupData();
  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={5} sm={5}>
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
    <StyledGapRow>
      <Row>
        <ServiceLogo />
      </Row>
      <Row>
        <AddExpenseForm />
      </Row>
      <Row>
        <SettlementSummary />
      </Row>
    </StyledGapRow>
  </Container>
);

const RightPane = () => {
  const groupName = useRecoilValue(groupNameState);
  return (
    <StyledRightPaneWrapper>
      <Row>
        <StyledGroupName>{groupName || '그룹 이름'}</StyledGroupName>
      </Row>
      <ExpenseTable />
    </StyledRightPaneWrapper>
  );
};

const StyledRightPaneWrapper = styled(Container)`
  padding: 100px 31px;
`;

const StyledGroupName = styled.h2`
  margin-bottom: 80px;
  text-align: center;
  font-weight: 700;
  font-size: 48px;
`;

const StyledGapRow = styled(Row)`
  padding-top: 100px;
  gap: 5vh;
  justify-content: center;
`;
