import Image from "next/image"
import { useEffect, useState } from "react"

export default function CardList() {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])

  const handleFetchPokemonDetails = async (id) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      const { name, sprites, species, types } = await response.json()

      return {
        name,
        avatar: sprites.front_default,
        species_url: species.url,
        types,
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleFetchPokemonDescription = async (url) => {
    try {
      const response = await fetch(url)
      const { flavor_text_entries } = await response.json()
      const description =
        flavor_text_entries
          .find(({ language }) => language.name === "en")
          ?.flavor_text.replace(/[\n\f]/g, " ") || "Description not available"

      return description
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    const handleFetchPokemonData = async () => {
      try {
        setIsLoading(true)

        const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        const pokemonDetails = await Promise.all(
          ids.map((id) => handleFetchPokemonDetails(id))
        )

        const detailedPokemonData = await Promise.all(
          pokemonDetails.map(async (item) => ({
            ...item,
            description: await handleFetchPokemonDescription(item.species_url),
          }))
        )

        console.log(detailedPokemonData)
        setData(detailedPokemonData)
        setIsLoading(false)
      } catch (error) {
        console.log(error.message)
      }
    }
    handleFetchPokemonData()
  }, [])

  return (
    <div className='sm:w-10/12 h-full flex flex-wrap justify-center gap-3 py-14'>
      {!isLoading ? (
        data.map((item, index) => (
          <div
            key={index}
            className={`w-56 flex flex-col items-center py-4 gap-3 rounded-xl shadow-md hover:shadow-2xl transition-shadow transform hover:scale-105 duration-300 ${
              item.types.some((type) => type.type.name === "grass")
                ? "bg-gradient-to-r from-green-400 to-green-600"
                : item.types.some((type) => type.type.name === "fire")
                ? "bg-gradient-to-r from-red-400 to-red-600"
                : item.types.some((type) => type.type.name === "water")
                ? "bg-gradient-to-r from-blue-400 to-blue-600"
                : "bg-gradient-to-r from-gray-400 to-gray-600"
            }`}
          >
            <Image
              className='w-32 h-32 rounded-full mx-auto border-4 border-gray-200'
              src={item.avatar}
              alt={item.name}
              height={128}
              width={128}
            />

            <p className='text-lg text-white text-center font-bold capitalize'>
              {item.name}
            </p>

            <p className='text-white text-center text-xs leading-relaxed w-11/12'>
              {item.description}
            </p>
          </div>
        ))
      ) : (
        <p className='text-gray-700 text-lg'>Loading...</p>
      )}
    </div>
  )
}
