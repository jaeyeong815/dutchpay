# 더치페이 서비스 (dutchpay)

여러 명이 각자 계산한 뒤 최종 정산을 할 때 누구에게 얼마를 줘야하는지 계산을 도와주는 더치페이 서비스 <br>
테스트 코드를 먼저 작성하는 TDD를 활용하여 개발하였습니다.

## 구현 기능

- 모임 그룹 생성
- 그룹 멤버 추가
- 지출내역 등록
- 멤버 별 정산 내역 계산
- 이미지 공유 및 링크 공유

## 배포

[배포링크](https://main.d2iqmzzrqvuaao.amplifyapp.com/group) <br>
AWS Amplify로 배포되었습니다.

## 설계

### 아키텍처 다이어그램
<img alt='아키텍처다이어그램' src='https://github.com/jaeyeong815/dutchpay/assets/85178602/39ef1e92-1bca-4136-b629-fb37229bb5cc' width='700' />

### 시퀀스 다이어그램
<img alt='시퀀스다이어그램' src='https://github.com/jaeyeong815/dutchpay/assets/85178602/d78b48ce-03b8-466e-ab87-46d2b97cfdaf' width='700' />

### 컴포넌트 다이어그램
<img alt='컴포넌트 다이어그램' src='https://github.com/jaeyeong815/dutchpay/assets/85178602/c6f78481-b839-48fd-b647-84cf5bf8d9ea' width='700' />

## 사용한 기술

```
React
React-Router-Dom
Recoil
React-Testing-Library
aws-amplify
html-to-image
React-bootstrap
Styled-Components
```

## 구현 화면

### 1. 모임 그룹 생성하기

![그룹생성](https://github.com/jaeyeong815/dutchpay/assets/85178602/8ba36bbe-053c-4d83-9464-5d77302c7815)

### 2. 그룹 멤버 추가하기

![멤버추가](https://github.com/jaeyeong815/dutchpay/assets/85178602/28383016-9ae2-487f-a60c-071e465261e9)

### 3. 지출 내역 추가하기

https://github.com/jaeyeong815/dutchpay/assets/85178602/f8fc5041-a272-42ed-8011-a2b1f0ebc6c7

### 4. 정산 내역 공유하기

### 4-1) 이미지 import

![이미지공유](https://github.com/jaeyeong815/dutchpay/assets/85178602/46117cc1-f1ed-4536-82a0-762a1577ad00)

### 4-2) 링크 공유

![링크공유](https://github.com/jaeyeong815/dutchpay/assets/85178602/670c45c0-e9d3-457b-abc4-34b7338a6ada)
