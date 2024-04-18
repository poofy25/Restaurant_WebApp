'use server'
import HomeCategorySection from '@/app/_HomePage/CategorySection/CategorySection'
// import HeroSection from '@/components/Hero/Hero'



export default async function Home() {

  const response = await fetch(`${process.env.WEBSITE_URL}/api/menu/category` , { cache : "no-store"})

  const responseJson = await response.json()
  const activeData = responseJson.filter(category => category.active === true);
  console.log("CATEGORIES: " , activeData)

  const data = activeData

  return (
    <main className='flex flex-wrap justify-start px-[7.5vw] gap-[3vw] sm:gap-0 bg-repeat'>
      <div className="w-full flex flex-col gap-16">
      <p>{Date.now()}</p>
      <p>{data.length}</p>


      {data.map((categoryData, index)=>{
        if(categoryData.active) {
            return (
              <HomeCategorySection key={index} categoryData={categoryData}/>
              )
          }
        })
      }

      </div>

    </main>
  );
}
