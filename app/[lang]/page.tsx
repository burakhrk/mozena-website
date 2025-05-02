import { getDictionary } from "@/lib/dictionaries"
import HomePage from "@/components/home-page"

export default async function Home({ params }: { params: { lang: "en" | "tr" } }) {
  // Load dictionary on the server side
  const dictionary = await getDictionary(params.lang)

  // Pass the dictionary to the client component
  return <HomePage dictionary={dictionary} lang={params.lang} />
}
