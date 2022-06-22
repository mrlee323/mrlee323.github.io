---
layout: post
title: "[Git] github에 push하기 "
data: '2021-12-02'
category: ['Git']
---

## 터미널에서 파일 작업하기
- vi 파일명 -> vim으로 이동후 파일을 수정
- vsc를 이용해 파일 수정도 가능

## 파일 작업 완료 후
- git add 파일명 -> 파일을 staging Area로 보냄 commit 전단계
- git commit 파일명 -> local 저장소로 저장 

- 저장시 vim모드가 뜨고 거기에 commit에 대한 정보를 기입
```
Type: 제목

본문

꼬리말
```
```
type 양식
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 변경이 없이 코드 포맷 변경, 세미 콜론 누락 수정
refactor: 코드 리팩터링
test: 코드 변경 없이 테스트 추가, 리팩터링 
chore: 코드 변경 없이 빌드 테스크 업데이트, 패키지 매니저 설정
```
- git push origim main -> github로 push/ 여기서 main은 branch name
- __명령어 한개 끝날때마다 git status로 작업상황을 확인__

## 원격저장소에서 파일 내려받기

- git pull origin master or git pull 입력

- 내려받기후 git log와 ls로 상태 확인

