import type { Category, CategorySlug } from '@/types';

export const CATEGORIES: Category[] = [
  {
    slug: 'react',
    label: 'React',
    color: '#2e7d74',
    bgColor: 'rgba(46,125,116,0.08)',
    borderColor: 'rgba(46,125,116,0.28)',
    icon: 'fa-brands fa-react',
    description: 'React 공식 기능, 패턴, 생태계 심층 가이드',
  },
  {
    slug: 'typescript',
    label: 'TypeScript',
    color: '#35618e',
    bgColor: 'rgba(53,97,142,0.08)',
    borderColor: 'rgba(53,97,142,0.28)',
    icon: 'fa-brands fa-js',
    description: '타입 안전한 코드 작성을 위한 TypeScript 심화 학습',
  },
  {
    slug: 'nextjs',
    label: 'Next.js',
    color: '#33312d',
    bgColor: 'rgba(51,49,45,0.06)',
    borderColor: 'rgba(51,49,45,0.24)',
    icon: '▲',
    description: 'Next.js App Router, 성능 최적화, 배포 전략',
  },
  {
    slug: 'cssdesign',
    label: 'CSS/Design',
    color: '#8a5a83',
    bgColor: 'rgba(138,90,131,0.08)',
    borderColor: 'rgba(138,90,131,0.28)',
    icon: 'fa-brands fa-css3-alt',
    description: '현대 CSS, 레이아웃, 디자인 시스템, Web Vitals',
  },
  {
    slug: 'ai',
    label: 'AI',
    color: '#c0663d',
    bgColor: 'rgba(192,102,61,0.08)',
    borderColor: 'rgba(192,102,61,0.28)',
    icon: 'fa-solid fa-robot',
    description: '프론트엔드 개발자를 위한 AI 도구와 SDK 활용',
  },
];

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c])
) as Record<CategorySlug, Category>;
