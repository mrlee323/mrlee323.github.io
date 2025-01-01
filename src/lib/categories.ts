import type { Category, CategorySlug } from '@/types';

export const CATEGORIES: Category[] = [
  {
    slug: 'react',
    label: 'React',
    color: '#61dafb',
    bgColor: 'rgba(97,218,251,0.1)',
    borderColor: 'rgba(97,218,251,0.4)',
    icon: 'fa-brands fa-react',
    description: 'React 공식 기능, 패턴, 생태계 심층 가이드',
  },
  {
    slug: 'typescript',
    label: 'TypeScript',
    color: '#3178c6',
    bgColor: 'rgba(49,120,198,0.1)',
    borderColor: 'rgba(49,120,198,0.4)',
    icon: 'fa-brands fa-js',
    description: '타입 안전한 코드 작성을 위한 TypeScript 심화 학습',
  },
  {
    slug: 'nextjs',
    label: 'Next.js',
    color: '#e2e8f0',
    bgColor: 'rgba(226,232,240,0.08)',
    borderColor: 'rgba(226,232,240,0.3)',
    icon: '▲',
    description: 'Next.js App Router, 성능 최적화, 배포 전략',
  },
  {
    slug: 'cssdesign',
    label: 'CSS/Design',
    color: '#38bdf8',
    bgColor: 'rgba(56,189,248,0.1)',
    borderColor: 'rgba(56,189,248,0.4)',
    icon: 'fa-brands fa-css3-alt',
    description: '현대 CSS, 레이아웃, 디자인 시스템, Web Vitals',
  },
  {
    slug: 'ai',
    label: 'AI',
    color: '#a78bfa',
    bgColor: 'rgba(167,139,250,0.1)',
    borderColor: 'rgba(167,139,250,0.4)',
    icon: 'fa-solid fa-robot',
    description: '프론트엔드 개발자를 위한 AI 도구와 SDK 활용',
  },
];

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c])
) as Record<CategorySlug, Category>;
