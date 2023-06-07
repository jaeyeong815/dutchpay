import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Col, Container, Row } from 'react-bootstrap';
import { ShareFill } from 'react-bootstrap-icons';

import { groupNameState } from '../state/groupName';
import { ServiceLogo } from './shared/ServiceLogo';
import { AddExpenseForm } from './AddExpenseForm';
import { ExpenseTable } from './ExpenseTable';
import { SettlementSummary } from './SettlementSummary';
import { useGroupData } from '../hooks/useGroupData';

export const ExpenseMain = () => {
  useGroupData();

  const handleSharing = (event) => {
    if (navigator.userAgent.match(/iphone|android/i) && navigator.share) {
      navigator.share({
        url: window.location.href,
      });
    } else {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => alert('공유 링크가 복사되었습니다! 그룹 멤버들과 공유해 보세요!'));
    }
  };

  return (
    <Container fluid>
      <Row className='justify-content-center'>
        <Col xs={10} sm={10} md={7} lg={5}>
          <LeftPane />
        </Col>
        <Col>
          <RightPane />
        </Col>
      </Row>
      <StyledShareBtn onClick={handleSharing} data-testid='share-btn'>
        <ShareFill />
      </StyledShareBtn>
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
  word-break: keep-all;
`;

const StyledGapRow = styled(Row)`
  padding-top: 100px;
  gap: 5vh;
  justify-content: center;
`;

const StyledShareBtn = styled.div`
  position: fixed;
  width: 55px;
  height: 55px;
  right: 40px;
  bottom: 45px;

  border-radius: 50%;
  color: white;
  background-color: #6b3da6;
  filter: drop-shadow(4px 4px 6px rgba(0, 0, 0, 0.25));

  font-size: 30px;
  text-align: center;
  cursor: pointer;

  svg {
    padding-right: 3px;
    padding-top: 3px;
  }
`;
