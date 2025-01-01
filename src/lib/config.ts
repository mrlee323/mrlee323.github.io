export const SITE_CONFIG = {
  name: '이민이 Dev Blog',
  shortName: 'MinDev',
  description: '프론트엔드 개발자 이민이의 기술 블로그',
  url: 'https://mrlee323.github.io/blog',
  author: {
    name: '이민이',
    role: 'Frontend Developer',
    bio: '안녕하세요, 프론트엔드 개발자 이민이입니다.\nReact와 TypeScript를 주력으로 사용하며, Next.js 기반의 웹 서비스를 개발하고 있습니다.\n사용자 경험과 성능 최적화에 관심이 많고, 컴포넌트 설계와 상태 관리 아키텍처를 즐겨 고민합니다.\n이 블로그에서는 실제 개발 과정의 문제와 해결 방법, 최신 프론트엔드 기술 트렌드를 공유합니다.',
    github: 'mrlee323',
    techStack: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vite'],
    skills: [
      {
        category: 'React',
        icon: 'fa-brands fa-react',
        color: '#61dafb',
        items: ['React 19', 'React Query', 'Zustand', 'Jotai', 'React Hook Form'],
      },
      {
        category: 'TypeScript',
        icon: 'fa-brands fa-js',
        color: '#3178c6',
        items: ['TypeScript 5.x', 'Zod', 'tRPC', 'Generics', 'Type Challenges'],
      },
      {
        category: 'Next.js',
        icon: '▲',
        color: '#e2e8f0',
        items: ['Next.js 15', 'App Router', 'Server Actions', 'Turborepo', 'Vercel'],
      },
      {
        category: 'CSS/Design',
        icon: 'fa-brands fa-css3-alt',
        color: '#38bdf8',
        items: ['Tailwind CSS v4', 'CSS Grid', 'Container Queries', 'Framer Motion'],
      },
    ],
    stats: {
      posts: 23,
      years: '3년+',
      mainStack: 'React & Next.js',
    },
  },
};
