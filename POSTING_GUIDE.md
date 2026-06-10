# 블로그 포스팅 가이드

포스팅 작성 시 참고하는 스타일·포맷·커밋 규칙 정리.

---

## 1. Frontmatter

```mdx
---
title: "제목: 부제목 또는 핵심 키워드"
date: "YYYY-MM-DD"
category: "react" | "typescript" | "nextjs" | "cssdesign" | "ai"
excerpt: "포스트 요약. 무엇을 다루는지 + 어떤 내용을 얻을 수 있는지 1~2문장."
tags: ["태그1", "태그2", "태그3", "태그4"]
readingTime: 숫자  # 분 단위 (1000자 ≈ 3분 기준)
---
```

### 카테고리 기준

| slug | 라벨 | 사용 기준 |
|------|------|----------|
| `react` | React | React 생태계, 상태 관리, 컴포넌트 설계, 일반 프론트엔드 |
| `typescript` | TypeScript | TS 문법, 타입 패턴, Zod 등 |
| `nextjs` | Next.js | App Router, SSR/SSG, 배포, 인프라 |
| `cssdesign` | CSS/Design | Tailwind, 레이아웃, 디자인 시스템 |
| `ai` | AI | AI API, 자동화, LLM, 브라우저 AI |

### excerpt 작성 패턴

```
"[무엇을 했는지/다루는지]. [어떤 내용을 얻을 수 있는지]."

예시:
"별도 서버 없이 Next.js 안에서 Cron + 이벤트 기반 백그라운드 작업을 구현한 실전 사례.
쇼케이스 콘텐츠를 자동으로 생성·저장하는 어드민 자동화 시스템을 Inngest로 구축한 과정을 공유합니다."
```

---

## 2. 포스트 구조

### 기본 뼈대

```
## 도입부 — 왜 이 글을 쓰는가
  배경 / 문제 정의 / 이 글에서 얻을 수 있는 것

## 개념 설명 (필요 시)
  정의 / 기존 방식과 차이 / 비교 표

## 본론 (2~5개 섹션)
  실제 코드 + 설명
  → 왜 이렇게 했는지 의도 포함

## 정리 / 요약
  핵심만 압축
  언제 쓰면 좋은지 기준 제시
```

### 포스트 유형별 구조

#### 개념 설명형 (신기술 소개)
```
1. [기술명]이란?
2. 왜 기존 방식으로는 부족했나 (문제)
3. 핵심 개념 A
4. 핵심 개념 B
5. 실전 예시 코드
6. 제약/주의사항
7. 언제 쓸지 판단 기준
8. 정리
```

#### 실전 구현형 (내가 만든 것)
```
1. 왜 만들었나 (배경/문제)
2. [선택지 비교 또는 전환 배경] — 선택 이유 포함
3. 전체 구조/아키텍처 다이어그램
4. Step 1: 핵심 구현
5. Step 2: 세부 구현
6. Step 3: ...
7. 로컬 개발/배포
8. 정리
```

#### 비교형 (A vs B)
```
1. 왜 비교하는가
2. A 개요
3. B 개요
4. 코드로 비교
5. 언제 A / 언제 B
6. 정리
```

---

## 3. 글쓰기 스타일

### 도입부 패턴

문제 → 기존 방식의 한계 → 이 글의 목적 순서로 시작.

```markdown
## [기술명]이란?

[기술 한 줄 정의]. [기존 방식]이 [한계]였다면,
[이 기술]은 [어떻게 해결하는지] 합니다.

핵심 차이는 이겁니다.
```

또는 실제 경험으로 시작:

```markdown
## 왜 [기술]이 필요했나?

[상황 설명]. 문제는 [구체적 문제]였습니다.

1. **[문제 1]** — [설명]
2. **[문제 2]** — [설명]
```

### 설명 스타일 원칙

- **왜(Why)를 먼저** — 코드 전에 이 코드가 왜 필요한지 설명
- **비교로 설득** — "기존에는 이랬는데, 이렇게 바뀌었다"
- **짧은 문장** — 한 문장에 하나의 개념
- **인용 블록** — 핵심 철학이나 원칙은 `>` 인용으로 강조
- **볼드** — 핵심 단어, 중요한 판단 기준에 사용

```markdown
> "언제든 되돌릴 수 있는가?"

**하네스 엔지니어링의 핵심 철학은 간단합니다.**
```

### 정리 섹션 패턴

```markdown
## 정리

[기술/패턴]의 핵심은 **"[한 줄 요약]"** 입니다.

[언제 쓰면 좋은지 1~2문장].
[독자에게 남기는 행동 제안 1문장].
```

---

## 4. 코드 블록

### 파일 경로 주석

실제 프로젝트 경로를 주석으로 명시.

```typescript
// src/infrastructure/inngest/client.ts
import { Inngest } from "inngest";

export const inngest = new Inngest({ id: "ota-project" });
```

### Before / After 비교

```typescript
// 수정 전
let timeout = status === "preDelaying" && setTimeout(...);

// 수정 후
const timeout = status === "preDelaying" && setTimeout(...);
```

### 불가/권장 패턴

```
✅ 브라우저 AI가 적합한 경우
- 개인정보가 민감한 데이터 처리
- 오프라인 동작이 필요한 앱

❌ 서버 AI가 더 나은 경우
- 최신 고품질 LLM이 필요한 경우
```

### 아키텍처 다이어그램

복잡한 흐름은 코드 블록 안에 ASCII로 표현.

```
[트리거] → [처리1] → [처리2] → [결과]
              ↓
          [에러 처리]
```

---

## 5. 자주 쓰는 섹션 패턴

### 비교 표

| | A | B |
|---|---|---|
| 방식 | ... | ... |
| 적합한 케이스 | ... | ... |

### 체크리스트

```markdown
| 레이어 | 도구 | 목적 |
|--------|------|------|
| 코드 격리 | Error Boundary | 런타임 폭발 범위 제한 |
| 기능 제어 | Feature Flag | 코드 배포와 기능 노출 분리 |
```

### 언제 쓸지 판단 기준

```markdown
## [기술]을 써야 할 때

**적합한 경우:**
- 조건 1
- 조건 2

**쓰지 않아도 되는 경우:**
- 조건 1
- 조건 2
```

---

## 6. 커밋 규칙

### 포스트 커밋

```bash
GIT_AUTHOR_DATE="YYYY-MM-DDT10:00:00" \
GIT_COMMITTER_DATE="YYYY-MM-DDT10:00:00" \
git commit -m "포스트: [제목 요약]"
```

- **날짜**: frontmatter `date`와 반드시 일치
- **메시지 형식**: `포스트: [내용 요약]`
- **Co-Authored-By 없음**

### 포스트 외 커밋

```bash
# 프로필/설정 변경
git commit -m "프로필 업데이트: [변경 내용]"

# 포스트 내용 보완
GIT_AUTHOR_DATE="..." git commit -m "포스트 보완: [추가 내용]"

# 배포/CI 관련
git commit -m "ci: [변경 내용]"
```

---

## 7. 실제 포스팅 흐름

```
1. 주제 결정 + 날짜 확인
2. 실제 코드/경험 참고 (관련 프로젝트 파일 확인)
3. MDX 작성 → content/posts/[slug].mdx
4. frontmatter date와 동일한 날짜로 커밋
5. git push origin main
```

### 슬러그 네이밍

```
[기술]-[핵심주제]            webgpu-browser-inference
[기술]-[구현대상]            inngest-admin-automation
[기술]-[특징]                xstate-v5-wizard-ui
[프로젝트]-[작업내용]        harness-engineering-legacy-project
```

---

## 8. 포스트 현황

| 날짜 | 슬러그 | 카테고리 |
|------|--------|---------|
| 2025-01-15 | css-modern-layout | cssdesign |
| 2025-03-01 | frontend-ai-trends-2025 | ai |
| 2025-04-08 | react-compiler-memoization | react |
| 2025-05-20 | typescript-typesafe-api | typescript |
| 2025-06-01 | llm-ui-generation | ai |
| 2025-06-12 | nextjs-performance | nextjs |
| 2025-07-01 | zustand-jotai-comparison | react |
| 2025-07-22 | nextjs-middleware-auth | nextjs |
| 2025-08-10 | web-vitals-optimization | cssdesign |
| 2025-08-30 | typescript-utility-types | typescript |
| 2025-09-01 | github-copilot-cursor | ai |
| 2025-09-18 | turborepo-monorepo | nextjs |
| 2025-10-05 | react-query-v5-migration | react |
| 2025-10-25 | css-container-queries | cssdesign |
| 2025-11-15 | typescript-advanced-generics | typescript |
| 2025-11-30 | nextjs-server-actions | nextjs |
| 2025-12-01 | chatgpt-api-react | ai |
| 2025-12-18 | react-server-components | react |
| 2026-01-20 | tailwind-css-v4 | cssdesign |
| 2026-02-10 | typescript-5x-features | typescript |
| 2026-02-28 | nextjs-15-app-router | nextjs |
| 2026-03-01 | vercel-ai-sdk-guide | ai |
| 2026-03-15 | react-19-guide | react |
| 2026-04-11 | harness-engineering-frontend | react |
| 2026-04-15 | harness-engineering-legacy-project | react |
| 2026-04-18 | n8n-frontend-automation | ai |
| 2026-04-25 | inngest-admin-automation | ai |
| 2026-05-02 | xstate-v5-wizard-ui | react |
| 2026-05-11 | webgpu-browser-inference | ai |
| 2026-05-16 | ai-summary-card-ui | react |
| 2026-05-17 | nextjs-route-handler-llm | nextjs |
| 2026-06-10 | core-web-vitals-production | react |
| 2026-07-15 | llm-production-lessons | ai |
| 2026-08-10 | senior-frontend-judgment | react |

---

## 9. 프론트엔드 시니어가 AI 시대를 사는 법 — 시리즈 현황

Day 1 = 2026-05-16. 시니어 4년차 관점에서 성능·AI·판단력을 다루는 시리즈.

### Part 1 — 성능이 곧 임팩트다

| Day | 날짜 | 슬러그 | 상태 |
|-----|------|--------|------|
| 1 | 2026-05-16 | ai-summary-card-ui | ✅ |
| 2 | 2026-05-17 | nextjs-route-handler-llm | ✅ |
| 3 | 2026-06-10 | core-web-vitals-production | ✅ |

### Part 2 — AI 기능을 제품에 붙이는 경험

| Day | 날짜 | 슬러그 | 상태 |
|-----|------|--------|------|
| 4 | 2026-07-15 | llm-production-lessons | ✅ |

### Part 3 — 시니어로 성장하는 판단들

| Day | 날짜 | 슬러그 | 상태 |
|-----|------|--------|------|
| 5 | 2026-08-10 | senior-frontend-judgment | ✅ |
