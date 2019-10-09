# HTTP

Hypertext Transfer Protocol  
웹서버와 웹브라우저 간에 메시지를 주고 받기 위해 정한 약속  
주고받는 메시지는 request와 response가 있다

## request message

요청 메시지는 다음과 같은 구조로 구성된다.

1. 요청행
2. 요청 헤더
3. 공백 행
4. 메시지 본문

요청행 예시 : GET /index.html HTTP/1.1

## response message

...

---

## 학습목표 & 나름 답

- HTTP 란 무엇인지 이해한다.

  - Hypertext Transfer Protocol
  - 웹서버와 웹브라우저 간에 통신을 하기 위해 정한 규칙
  - 메시지를 '이러이러한 형태로 한다'라는 규칙

- HTTP headers 가 왜 필요한지, 어떤 속성이 있는지 안다.

  - 왜? 메시지의 내용을 요약하기 위해 + 통신 규격을 맞추기 위해(언어, 압축방법, 인코딩 등)
  - Cache-Control
  - Content-Length
  - Content-Language
  - Content-Encoding
  - User-Agent

- URL 어떤 구조로 되어 있는지 안다.
  - 스키마, 호스트네임, 패스(경로), 쿼리
- HTTP Method가 왜 필요한지 어떤 것이 있는지 안다.
- STATUS code가 왜 필요한지 어떤 것이 있는지 안다.

- HTTP 버전의 역사
  - 0.9 : GET만 있는 요청메시지 + HTML 응답 메시지만 있었음
  - 1.0 : 
  - 1.1 : 성능 개선 버전
    - Keep-Alive : 기존의 연결을 재사용. round-trip time 절약
    - 파이프라이닝 : 
    - 캐싱 메커니즘 명확히 정의 + 성능 향상
      - Expires 헤더 추가 + Etag 설정
    - Gzip압축
- URL의 구조(스키마,호스트네임,패스 구분)
- HTTP Method 는 무엇이고 왜 필요한가? (GET/POST 필수학습)

  - 무엇? 웹서버에 요청메시지를 보낼때 웹서버가 어떠한 동작을 수행해야하는지 알려주는 키워드
  - 왜? 웹서버가 메시지를 가지고 해야하는 '동작'을 알려주기 위해서

- HTTP Status 는 무엇이고 왜 필요한가?
- cookie 가 필요한 이유
  - 웹페이지 개인화, 임시 데이터 보관에 사용

- 캐시란 무엇인가?
  - 요청이 있을때 서버가 아니라 클라이언트쪽에서 꺼내서 볼 수 있게 자원을 저장해두는 것
  - no-cache (until comfirmed) 서버에 유효성을 확인해야만 한다.

- HTTP Header 에는 어떤 속성들이 들어 있는가?
- html form과 x-www-form-urlencoded 란 ?

---

프런트cs  
네트워크, 자료구조, 알고리즘 + 브라우저 기본 이해

## 왜 http를 알아야할까?

약속을 안지켜도 돌아가긴하는데 잠재적인 문제를 내포하게 된다.  
성능개선, 최적화를 위해서 잘 이해해야함.  
예시) html의 img태그도 http로 요청하는것.

http랑 tcp만 알면 된다. 라우터 이런건 나중에..

## http 버전

웹서버가 사용하는 http 버전별로 지원되는 기능이 다름  
블로그 글을 볼때 버전이 명시된 것만 참고할 것

nginX, apache 이런 서버에 http가 구현되어있음  
웹브라우저에도 구현되어 있음(클라이언트)  
curl, postman 이런것도

메이저 업그레이드 = 보통은 하위 호환이 안됨  
http2.0은 완전 바뀐건 아니고 성능 개선 정도

## TCP

network layer  
데이터 전송 계층  
tcp특성. 얘가 뭘하는지? tcp socket  
데이터의 무결성을 체크  
3-way handshake : 웹브라우저 -> 서버 -> 웹브라우저 -> 서버  
매 통신마다 세번 왔다갔다 한다  
http/2 udp를 활용한 quic방법이 제안되어 있음(구글)

## url에 접속해서 화면이 보이기까지의 과정

- dns -> ip변환
- 라우터를 거쳐서 서버에 접근
- 'html 주세요' : GET 메소드로 루트디렉토리에서 기본 파일 요청

## \* URL

- 자원!
- url은 고유한 웹자원의 address이다
- RESTful URL
- 확장자가 없는 URL
  - 맛집.com/계란말이.html
  - 맛집.com/계란말이
- 서버단에서 if문으로 url에 따라 파일을 꺼내줌
- 파일이 변경되어도 고유한 url을 그대로 사용 가능

### 좋은 url

- google.com/users
- google.com/users/32
- 32번 유저를 삭제하든 변경하든 모두 같은 url로 접근
  명사로 체계적으로 구성

## \* 메소드

- url에 담겨져있지 않은 추가적인 정보
- GET/POST/PUT/DELETE
- 기본 요청은 GET
- 데이터 전송은 POST

## \* Status Code

- 자바스크립트에서 비동기 요청을 보냈을때 status code에 따라서 분기처리를 할 수도 있다
- 예) 400번대 코드일경우 잘못 요청한 것이므로 적절한 처리 등
- 200번대 : 정상응답
- 300번대 : 정상응답, 데이터 응답이 아닌, cache나 redirect 사용
- 400번대 : 잘못된 요청
- 500번대 : 서버문제

## \* 헤더

- 무슨 파일인지, 무슨 언어인지 파악하는데 오래걸리면 안됨
- 파싱을 다 해보고서야 알게되면 느림
- 헤더에 적어서 보냄(힌트!)

- 컨텐츠 타입
- 언어
- 압축 방식

- 메타정보를 헤더에 적어서 보냄
- body 이외의 모든 정보를 포함
- Client -> server

  - User-Agent, Referer, Authorization
  - userAgent 에 따라 코드를 짜선 안된다. feature detection이라고 함

- Server -> client
  - Content-type
