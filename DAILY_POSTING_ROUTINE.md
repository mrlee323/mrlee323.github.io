# 매일 블로그 포스팅 자동화 — JS/React/Next.js 제대로 알기

## 목적
JavaScript, React, Next.js 핵심 개념을 하나씩 깊게 파는 시리즈. 오늘 날짜 기준으로 주제 1개 선택 → 포스팅 작성 → 커밋 + push.

## 블로그 작성자 정보
- 4년차 프론트엔드 개발자
- 여행/OTA 서비스 회사 근무

## 레포 구조
- 포스팅 경로: `content/posts/[slug].mdx`
- 포스팅 스타일 가이드: `POSTING_GUIDE.md` (반드시 읽을 것)

---

## Step 1: 주제 선택 (레포 루트에서 실행)

아래 주제 목록에서 오늘 포스팅할 주제를 선택한다.

**선택 로직:**
```python
# 기준일: 2026-10-27
# index = (today - 2026-10-27).days % 61
# 단, 해당 슬러그가 content/posts/에 이미 존재하면
# 다음 미작성 주제(index+1, index+2, ...)를 순서대로 탐색
# 모든 61개 주제가 이미 작성되어 있으면 종료
```

실제 구현:
```bash
today=$(date +%Y-%m-%d)
python3 -c "
from datetime import date
import os

topics = [
  ('js-closure-scope', 'JS: 클로저와 스코프'),
  ('js-event-loop', 'JS: 이벤트 루프'),
  ('js-promise-internals', 'JS: Promise 내부 동작'),
  ('js-async-await-transform', 'JS: async/await의 정체'),
  ('js-prototype-chain', 'JS: 프로토타입 체인'),
  ('js-this-context', 'JS: this가 헷갈리는 이유'),
  ('js-call-apply-bind', 'JS: call, apply, bind'),
  ('js-destructuring-patterns', 'JS: 구조분해할당 패턴'),
  ('js-spread-rest-difference', 'JS: spread와 rest의 차이'),
  ('js-optional-chaining', 'JS: 옵셔널 체이닝과 nullish coalescing'),
  ('js-modules-esm', 'JS: ESM vs CommonJS'),
  ('js-generator-iterator', 'JS: 제너레이터와 이터레이터'),
  ('js-weakmap-weakref', 'JS: WeakMap, WeakSet, WeakRef'),
  ('js-proxy-reflect', 'JS: Proxy와 Reflect'),
  ('js-symbol-usage', 'JS: Symbol이 존재하는 이유'),
  ('js-array-methods-internals', 'JS: map/filter/reduce 내부 동작'),
  ('js-property-descriptor', 'JS: 프로퍼티 디스크립터'),
  ('js-microtask-macrotask', 'JS: 마이크로태스크 vs 매크로태스크'),
  ('js-error-types', 'JS: 에러 타입 완전 정리'),
  ('js-tagged-template', 'JS: Tagged template literals'),
  ('js-class-private-fields', 'JS: class private fields(#)'),
  ('js-structured-clone', 'JS: structuredClone과 깊은 복사'),
  ('js-garbage-collection', 'JS: 가비지 컬렉션과 메모리 누수'),
  ('js-typed-arrays', 'JS: TypedArray와 ArrayBuffer'),
  ('js-bigint-usage', 'JS: BigInt가 필요한 순간'),
  ('react-usestate-internals', 'React: useState 내부 동작'),
  ('react-useeffect-timing', 'React: useEffect 실행 타이밍'),
  ('react-useeffect-deps', 'React: useEffect 의존성 배열'),
  ('react-usecallback-when', 'React: useCallback을 써야 하는 타이밍'),
  ('react-usememo-cost', 'React: useMemo의 적절한 사용'),
  ('react-useref-not-just-dom', 'React: useRef는 DOM 참조만이 아니다'),
  ('react-usecontext-pitfalls', 'React: useContext 성능 함정'),
  ('react-usereducer-vs-state', 'React: useReducer vs useState'),
  ('react-custom-hooks-design', 'React: 커스텀 훅 설계 원칙'),
  ('react-reconciliation', 'React: 재조정(Reconciliation) 알고리즘'),
  ('react-fiber-architecture', 'React: Fiber 아키텍처'),
  ('react-keys-in-lists', 'React: key prop의 진짜 역할'),
  ('react-controlled-uncontrolled', 'React: controlled vs uncontrolled'),
  ('react-event-delegation', 'React: 이벤트 위임 방식'),
  ('react-error-boundary', 'React: Error Boundary'),
  ('react-suspense-mechanics', 'React: Suspense 동작 원리'),
  ('react-memo-shallow', 'React: React.memo와 얕은 비교'),
  ('react-portal-usage', 'React: Portal 동작 원리'),
  ('react-lazy-splitting', 'React: React.lazy와 코드 스플리팅'),
  ('react-usetransition-why', 'React: useTransition이 필요한 이유'),
  ('react-usedeferredvalue', 'React: useDeferredValue 사용 기준'),
  ('react-batching-updates', 'React: 자동 배칭(Auto Batching)'),
  ('react-server-components-why', 'React: Server Components가 필요한 이유'),
  ('react-strict-mode-why', 'React: StrictMode가 두 번 실행하는 이유'),
  ('nextjs-app-router-why', 'Next.js: App Router가 Pages Router를 대체한 이유'),
  ('nextjs-server-client-boundary', 'Next.js: 서버/클라이언트 컴포넌트 경계'),
  ('nextjs-data-fetching-patterns', 'Next.js: 서버 컴포넌트에서의 데이터 패칭'),
  ('nextjs-server-actions-form', 'Next.js: Server Actions 동작 원리'),
  ('nextjs-middleware-when', 'Next.js: Middleware와 Edge 실행'),
  ('nextjs-image-why', 'Next.js: next/image가 img보다 나은 이유'),
  ('nextjs-dynamic-imports', 'Next.js: dynamic import 패턴'),
  ('nextjs-routing-patterns', 'Next.js: 동적/평행/인터셉팅 라우트'),
  ('nextjs-metadata-api', 'Next.js: Metadata API'),
  ('nextjs-streaming-suspense', 'Next.js: 스트리밍 SSR 원리'),
  ('nextjs-caching-layers', 'Next.js: 4가지 캐시 레이어'),
  ('nextjs-edge-vs-nodejs', 'Next.js: Edge Runtime vs Node.js Runtime'),
]

start = date(2026, 10, 27)
today = date.today()
base_idx = (today - start).days % len(topics)

posts_dir = 'content/posts'
for i in range(len(topics)):
    idx = (base_idx + i) % len(topics)
    slug, title = topics[idx]
    path = f'{posts_dir}/{slug}.mdx'
    if not os.path.exists(path):
        print(f'{slug}|||{title}|||{today}')
        break
else:
    print('ALL_DONE')
"
```

출력이 `ALL_DONE`이면 종료. 아니면 슬러그, 제목 레이블, 날짜를 파싱해서 다음 Step 진행.

---

## Step 2: 포스팅 작성

### 핵심 원칙

**독자**: 이 개념을 어느 정도 써봤지만 왜 이렇게 동작하는지 깊게 모르는 2~4년차 개발자.

**금지사항** ❌
- "이렇게 쓰세요" 식의 단순 사용법 안내
- MDN을 그대로 옮긴 것 같은 정의 나열
- "A를 하면 됩니다" 식의 결론만 있는 문장
- 신입 공부 노트 수준의 내용

**해야 할 것** ✅
- 이 개념이 왜 이렇게 설계됐는지 (WHY)
- 내부에서 어떻게 동작하는지 (HOW IT WORKS)
- 어떤 상황에서 쓰고 어떤 상황에서 안 쓰는지 (WHEN)
- 흔히 잘못 이해하거나 실수하는 지점 (TRAPS)
- 코드는 개념을 설명하는 최소한의 예시만

### Frontmatter 형식
```mdx
---
title: "제목"
date: "YYYY-MM-DD"
category: "react" | "nextjs" | "typescript"
excerpt: "한두 문장. 이 개념의 핵심 WHY를 담는다."
tags: ["태그1", "태그2", "태그3", "태그4"]
readingTime: 숫자
---
```

카테고리 기준:
- JavaScript 관련 → "typescript" (JS/TS 묶음)
- React 관련 → "react"
- Next.js 관련 → "nextjs"

### 포스팅 구조
```
## [개념명]이 존재하는 이유
  기존 방식의 한계 또는 이 개념이 해결하는 문제.
  코드 전에 WHY부터.

## 내부 동작 방식
  엔진/라이브러리 내부에서 어떻게 처리되는가.
  추상화 아래를 보여주는 섹션.

## 실제로 언제 쓰는가
  구체적인 사용 기준과 간단한 예시.

## 흔한 오해와 함정
  많이 틀리는 포인트. 있으면 코드로 before/after 비교.

## 정리
  한 줄 요약 + 언제 쓸지 기준 한 문장.
```

readingTime: 5~8분 목표.

---

## Step 3: 커밋 & Push

```bash
git add content/posts/[slug].mdx
GIT_AUTHOR_DATE="[오늘날짜]T10:00:00" GIT_COMMITTER_DATE="[오늘날짜]T10:00:00" \
git commit -m "포스트: [제목 요약]"
git push origin main
```

- Co-Authored-By 줄 없음
- GIT_AUTHOR_DATE = frontmatter date와 동일
- push 실패 시 `git pull --rebase origin main` 후 재시도 (최대 2회)
