'use server'

import HomeCategorySection from '@/app/_HomePage/CategorySection/CategorySection'
import { getCategoryFromName } from '@/app/actions/CategoryActions'

export default async function MenuCategory({params}) {
  const categoryURLName = params.category[0]
  const categoryName = categoryURLName.replaceAll('%20'," ").replaceAll('%26', "&")
  const categoryData = await getCategoryFromName(categoryName)

  return (
    <main className='flex flex-wrap justify-start px-[7.5vw] gap-[3vw] sm:gap-0'>
      {!categoryData?.error && categoryData && 
      <HomeCategorySection categoryData={categoryData} isPage={true}/>
      }
    </main>
  );
}
