# 🫷2024 국제불교영화제 팜플릿



#
# 0. Preview
 ### 1. Display Mode: Hidden 처리시

 ### 2. Display Mode: Hidden 후, 제외 검색어 "명상" 입력.

#
# 1. Install

### prerequisite
> Chrome browser

#### A. 자동설치
```

```
#
# 2. 오버뷰/ 스택

![image]()
[출처:velog.io/@minchoi/크롬-확장-프로그램-분석기-biauhudi]

기본 웹과 크롬 API를 사용하여 개발.

- HTML,CSS,JavaScript
- chrome API (chrome.storage)

#
# 3.git commit 메시지 규약
> * ➕ FEAT: 새로운 기능 추가
> * ❗ FIX: 버그 수정
> * 📝 DOCS: 문서 수정
> * 🎨 STYLE: 스타일 관련 기능
> * ⬆️ REFACTOR: 코드 리팩토링
> * 🔎 TEST: 테스트 코드 추가
> * ⚙ CHORE: 빌드 업무 수정, 패키지 매니저 수정(ex .gitignore 수정 같은 경우)

제목을 넘어, 본문 작성 필요시 '어떻게' 변경했는지 보다 '무엇을, 왜' 변경했는지 작성한다.
#
# 4. 개발로그

## 4-1. 서버 주소를 동적으로 가져오기
로컬에서 로컬서버를 이용해 테스트를 진행할 때, 로드해야하는 pdf파일 경로를 설정하기 위해 주소를 직접설정했다. 

``` 
const pdfPath = "http://localhost:8000/File/moviePamphlet.pdf"
```
그런데, 개발 중 Live Server 확장 프로그램을 사용하여 로컬 서버를 실행하면 포트번호가 변경되었고, CORS정책 위반으로 pdf가 로드되지 않았다.
```
const serverURL = `${window.location.protocol}//${window.location.host}`;
```
위와 같이 window.location 객체를 활용하면, 서버주소를 동적으로 가져오기 때문에 로컬 테스트 시 편리하다.

## 4-2. 유튜브 영상 삽입 시 embed방식의 사용
iframe(다른 HTML페이지를 현재 페이지에 포함)에서 youtube영상을 로드 시, **embed방식** 을 사용하도록 되어있다.
```
//일반주소 
https://www.youtube.com/watch?v=VIDEO_ID
```

``` 
//embed주소
https://www.youtube.com/embed/VIDEO_ID
```
embed URL은 유튜브가 설계한 인터페이스(YouTube Player API)이며, 유튜브는 이 인터페이스를 통해 자사의 API와 추가 기능을 활성화한다.

이 기능의 사용 이유는 
1. 광고 표시 및 수익관리 : 광고 데이터 추적 및 수익 관리가 가능해진다.
2. 개발자가 플레이어 동작 제어가능
3. 보안 : 자사 콘텐츠를 무분별하게 사용할 수 없도록 
X-Frame-Options를 사용하여 도메인을 지정해 제한한다.



## 5. TODO

### 5-1. 추가기능
+ [ ] 예외 검색어 다중 입력 기능
+ [ ] "구독" 페이지에서 예외검색어 기능
+ [ ] "쇼츠" 페이지에서 예외검색어 기능
+ [ ] 다중언어 지원 기능

### 5-2. 리팩토링
+ [ ] showSpecificThumbnail()에서 채널이름, 검색어 기능 각각 분류
+ [ ] 유튜브 페이지별 예외검색어 기능이 다르게 적용 필요. 확장성 고려한 변경.