

import HomeCategorySection from '@/app/_HomePage/CategorySection/CategorySection'


export default async function MenuCategory({params}) {
  const category = params.category
  return (
    <main className='flex flex-wrap justify-start px-[7.5vw] gap-[3vw] sm:gap-0'>
      <HomeCategorySection section={category} isPage={true}/>
    </main>
  );
}
