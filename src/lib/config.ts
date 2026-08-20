export const SITE_CONFIG = {
  name: '이미림 Dev Blog',
  shortName: 'MiriDev',
  description: '성능, AI, 그리고 판단에 대해 씁니다. 프론트엔드 개발자 이미림의 기술 블로그.',
  url: 'https://mrlee323.github.io/blog',
  author: {
    name: '이미림',
    role: 'Frontend Developer',
    bio: '프론트엔드 개발자로 4년, 결제 도메인의 무결성을 책임지며 서비스를 만들어왔습니다. Next.js와 React로 화면을 만들고, 라우팅과 데이터 흐름에 맞춰 SSR·CSR·SEO 전략을 함께 설계합니다.\n요즘은 프론트·앱·서버로 나뉜 여러 프로젝트를 가로질러 요구사항을 분해하고, AI가 그 실행을 병렬로 처리할 수 있는 구조를 만드는 일에 시간을 씁니다. 자동화의 목적은 사람을 빼는 게 아니라, 사람이 판단해야 할 지점을 정확히 찾아내는 것이라고 생각합니다.\n이 블로그에는 성능을 비즈니스 지표로 연결한 기록, AI 기능을 제품에 붙이며 틀렸던 가정들, 그리고 코드보다 그 앞의 선택에 대한 이야기를 씁니다.',
    github: 'mrlee323',
    email: 'mrlee3233@gmail.com',
    techStack: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vite'],
    skills: [
      // slug은 다크모드에서 색이 따라 바뀌도록 CSS 클래스로 쓰인다
      {
        category: 'React',
        slug: 'react',
        icon: 'fa-brands fa-react',
        items: ['React 19', 'React Query', 'Zustand', 'Jotai', 'React Hook Form'],
      },
      {
        category: 'TypeScript',
        slug: 'typescript',
        icon: 'fa-brands fa-js',
        items: ['TypeScript 5.x', 'Zod', 'tRPC', 'Generics', 'Type Challenges'],
      },
      {
        category: 'Next.js',
        slug: 'nextjs',
        icon: '▲',
        items: ['Next.js 15', 'App Router', 'SEO · SSR · CSR', 'Server Actions', 'Vercel'],
      },
      {
        category: 'CSS/Design',
        slug: 'cssdesign',
        icon: 'fa-brands fa-css3-alt',
        items: ['Tailwind CSS v4', 'CSS Grid', 'Container Queries', 'Framer Motion'],
      },
      {
        category: 'Backend/Infra',
        slug: 'backend',
        icon: 'fa-solid fa-server',
        items: ['Node.js', 'REST API', 'Prisma', 'PostgreSQL', 'GitHub Actions'],
      },
    ],
    // posts 수는 content/posts에서 자동 집계한다 (HeroSection)
    stats: {
      years: '4년차',
      mainStack: 'React & Next.js',
    },
  },
};
