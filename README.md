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
<img alt='아키텍처다이어그램' src='https://github.com/jaeyeong815/dutchpay/assets/85178602/1a881544-f028-4763-bd73-94deb487f2a3' width='700' />

### 시퀀스 다이어그램
<img alt='시퀀스다이어그램' src='https://github.com/jaeyeong815/dutchpay/assets/85178602/405812c0-7eb2-4e04-9c50-c534e5de96ee' width='700' />

### 컴포넌트 다이어그램
<img alt='컴포넌트 다이어그램' src='https://github.com/jaeyeong815/dutchpay/assets/85178602/22e0748c-943a-4d38-811e-f276f9b64278' width='700' />

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

![그룹생성](https://github.com/jaeyeong815/dutchpay/assets/85178602/664d0e81-4201-4a6d-b5b4-5517403c9cab)

### 2. 그룹 멤버 추가하기

![멤버추가](https://github.com/jaeyeong815/dutchpay/assets/85178602/286e4991-19d8-4607-88bf-e18bc88116fc)

### 3. 지출 내역 추가하기

https://github.com/jaeyeong815/dutchpay/assets/85178602/cc34e1d9-a61c-4cdb-951e-728567f170e0

### 4. 정산 내역 공유하기

### 4-1) 이미지 import

![이미지 공유](https://github.com/jaeyeong815/dutchpay/assets/85178602/5e88f8b4-1fb2-4aa0-8751-5c0133462903)

### 4-2) 링크 공유

![링크 공유](https://github.com/jaeyeong815/dutchpay/assets/85178602/fdbceaee-4a7b-428d-b9a5-9678e32ea7fd)
