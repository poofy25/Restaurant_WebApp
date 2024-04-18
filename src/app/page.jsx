'use server'
import HomeCategorySection from '@/app/_HomePage/CategorySection/CategorySection'
// import HeroSection from '@/components/Hero/Hero'

const dynamic = 'force-dynamic'


const GetCategories = async () => {
  const response = await fetch(`${process.env.WEBSITE_URL}/api/menu/category`)
  const responseJson = await response.json()
  return responseJson
}

export default async function Home() {

  const response = await fetch(`${process.env.WEBSITE_URL}/api/menu/category`)
  const responseJson = await response.json()
  console.log("DATA: " , responseJson)
  const data = responseJson
  return (
    <main className='flex flex-wrap justify-start px-[7.5vw] gap-[3vw] sm:gap-0 bg-repeat'>
      <div className="w-full flex flex-col gap-16">
      <p>{Date.now()}</p>

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
