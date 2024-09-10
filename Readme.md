# 🫷2024 국제불교영화제 팜플릿

세계의 불교 영화를 즐길 수 있는 세계일화국제불교영화제가 매년 개최되고 있다. 덕분에 작년에 재밌는 영화들을 볼 수 있었다. 

[세계일화국제불교영화제](https://www.oibff.com/oibff2_3/2) 

하지만 아쉽게도 사람들이 불교에 관심이 크지않고, 그래서 예산이 많지 않은 이유인지 홈페이지가 부실했다. 

영화 시간표와 해당 영화 정보를 볼 수 있는 페이지가 링크되어있지도 않고, 별도로 분리되어있었다. 더구나 영화의 예고편도 제공되지 않았다.

영화 시간표를 보면서, 영화 제목을 클릭 시 간단한 설명과 예고편을 볼 수 있는 페이지가 있으면 편리하겠다고 생각이 들었다. 그래서 만들어보았다.

다만, 이 페이지는 내가 임시로 만든 페이지이기 때문에 당장 공식 홈페이지에 제공되기는 어려울 것이다. 일단 제작하여 주변인들과 사용하고, 영화제에 제보할 생각(영화제는 매년 진행되니..) 

#
# 0. Preview
![OBIFF](https://github.com/user-attachments/assets/740d8f33-49aa-4daa-a152-4bbcfae77f45)

#
# 1. Install

### prerequisite
> - Docker 27.1.1 (Windows환경에서 WSL2사용)
> - nginx 1.26.2
> - GCP(Google Cloud Platfrom) VM
#### A. 로컬 실행
```
1. 로컬 웹서버 실행시
> VSCode "Live Server" Extension 사용. 
확장프로그램 설치 후, html파일 선택한 뒤 우측 하단 "Go Live"클릭. 

2. 로컬 도커 컨테이너 웹서버 배포시
docker build -t nginx-app .
docker run -d -p 8080:80 --name nginx-container nginx-app
```
#### B. GCP VM환경에서 도커 컨테이너 실행

```
1. GCP에 VM생성. VM에서 docker, nginx 설치.

2. VM 방화벽 설정을 통해 외부 접속 허용

3. 로컬 powershell에서:
> docker build -t [Your docker ID]/[image name] .
> docker push [Your docker ID]/[image name]

4. 원격서버 VM에서:
> docker login
> docker pull [your docker ID]/[image name]
> docker run --name [container name] -d -p 80:80 [your docker ID]/[image name]
```

# 2. 오버뷰/ 스택

- 언어: HTML, CSS, JavaScript
- Docker
- 웹서버: nginx
- 원격서버: GCP VM

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
그런데, 개발 중 Live Server 확장 프로그램을 사용하여 로컬 서버를 실행하면 포트번호가 달랐고, CORS정책 위반으로 pdf가 로드되지 않았다.
```
const serverURL = `${window.location.protocol}//${window.location.host}`;
```
위와 같이 window.location 객체를 활용하면, 서버주소를 동적으로 가져오기 때문에 로컬 테스트 시 편리하다.

## 4-2. 모달 종료 이벤트
모달 종료 이벤트는 종료 버튼으로 실행된다.
하지만, 보통 종료시 모달이 아닌 영역을 클릭하여 종료하는 경우가 더 많다. 어떻게 작성할지 고민했는데,
```
modal.addEventListener('click',closeModalOnClickOutside);

function closeModalOnClickOutside(event) {
        // 클릭한 요소가 모달 콘텐츠가 아닌 경우
        if (event.target === modal) {
            closeModal();
        }
    }
```
이와 같이 구현할 수 있었다.

## 4-3. 유튜브 영상 삽입 시 embed방식의 사용
iframe(다른 HTML페이지를 현재 페이지에 포함)에서 youtube영상을 로드 시, **embed방식** 을 사용하도록 강제 되어있다.
```
//일반주소 
https://www.youtube.com/watch?v=VIDEO_ID

//embed주소
https://www.youtube.com/embed/VIDEO_ID
```
유튜브는 이 인터페이스(YouTube Player API)를 통해 
1. 광고 표시 및 수익관리 
2. 개발자가 동작 제어가능
3. 보안 : 자사 콘텐츠를 무분별하게 사용할 수 없도록 도메인을 
제한  

와 같은 이점을 누린다.



## 5. TODO

### 5-1. 추가기능
+ [ ] HTTPS 지원 : SSL/TLS 인증서 설치 및 443포트 허용

### 5-2. 리팩토링
+ [ ] 현재 HTML파일에 영화예고편 영상주소 저장되어있음.  
-> 추후 영화추가되거나 변경 시 찾아서 변경해야하는 번거로움. 영화 이름과 영상 주소, pdf페이지를 별도로 저장하여 관리하도록 변경.
+ [ ] script.js 함수가 분리되어있지 않음. addEventListener함수안에 모든 기능이 들어있음.  
-> SRP원칙에 따라 함수 분리. 그리고, 함수는 한 가지 기능만 하도록.