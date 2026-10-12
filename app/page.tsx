import { ScrollProgress } from '@/components/navigation/scroll-progress';
import { ChapterNav } from '@/components/navigation/chapter-nav';
import { BackToTop } from '@/components/navigation/back-to-top';
import { ChapterIntroduction } from '@/components/narrative/chapter-introduction';
import { ChapterMindset } from '@/components/narrative/chapter-mindset';
import { ChapterIdeasToSystems } from '@/components/narrative/chapter-ideas-to-systems';
import { ChapterM31A } from '@/components/narrative/chapter-m31a';
import { ChapterSnigdhaOS } from '@/components/narrative/chapter-snigdha-os';
import { ChapterPortfolio } from '@/components/narrative/chapter-portfolio';
import { ChapterPhilosophy } from '@/components/narrative/chapter-philosophy';
import { ChapterRoadAhead } from '@/components/narrative/chapter-road-ahead';
import { ChapterContact } from '@/components/narrative/chapter-contact';

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <ChapterNav />
      <BackToTop />

      <main>
        <ChapterIntroduction />
        <ChapterMindset />
        <ChapterIdeasToSystems />
        <ChapterM31A />
        <ChapterSnigdhaOS />
        <ChapterPortfolio />
        <ChapterPhilosophy />
        <ChapterRoadAhead />
        <ChapterContact />
      </main>
    </>
  );
}
