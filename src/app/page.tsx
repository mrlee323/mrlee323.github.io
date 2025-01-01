import { getAllPostsMeta } from '@/lib/posts';
import HeroSection from '@/components/home/HeroSection';
import PostsSection from '@/components/home/PostsSection';
import AboutSection from '@/components/home/AboutSection';

export default async function HomePage() {
  const posts = getAllPostsMeta();

  return (
    <>
      <HeroSection />
      <PostsSection posts={posts} />
      <AboutSection />
    </>
  );
}
