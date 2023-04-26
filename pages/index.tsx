import FlexSearch from 'flexsearch';
import Fuse from 'fuse.js';
import { fuzzyFilter } from 'fuzzbunny';
import { matchSorter } from 'match-sorter';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';

interface Ammenity{
  name: string;
}

interface SearchResults{
  fuse: Ammenity[];
  flexsearch: Ammenity[];
  matchSorter: Ammenity[];
  fuzzbunny: Ammenity[];
}


export default function Home() {
  const ammenities = useAmmenities();
  const [query, setQuery] = useState('');
  const search = useSearch(ammenities);
  
  const [results, setResults] = useState<SearchResults>({
    fuse: [],
    flexsearch: [],
    matchSorter: [],
    fuzzbunny: [],
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setQuery(q)
    setResults(search(q));
  }


  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24`}
    >
      <span className="text-4xl mb-8 font-medium ">Buscador de hoteles Madrid</span>
      <input className="p-2 rounded-md" value={query} placeholder="Busca por nombre" onChange={handleInputChange}/>

      <div className='flex'>
        <SearchResult results={results.fuse} name="fuse"  />
        <SearchResult results={results.flexsearch} name="flexsearch" />
        <SearchResult results={results.matchSorter} name="matchSorter" />
        <SearchResult results={results.fuzzbunny} name="fuzzbunny" />
      </div>

      <span className="text-lg mt-8 font-medium">Lista completa</span>
      <SearchResult results={ammenities} name="" />
    </main>
  )
}


function useSearch(ammenities: Ammenity[]): (query: string) => SearchResults{
  const fuseSearch = useFuse(ammenities);
  const flexsearchSearch = useFlexsearch(ammenities)
  const matchSorterSearch = useMatchSorter(ammenities)
  const fuzzbunnySearch = useFuzzbunny(ammenities)

return useCallback((query: string)=>{
  const fuseResults = fuseSearch(query)
  const flexsearchResults = flexsearchSearch(query)
  const matchSorterResults = matchSorterSearch(query)
  const fuzzbunnyResults = fuzzbunnySearch(query)

  const results: SearchResults = {
      fuse: fuseResults,
      flexsearch: flexsearchResults,
      matchSorter: matchSorterResults,
      fuzzbunny: fuzzbunnyResults
    }

  return results;
  }, [
      fuseSearch,
      flexsearchSearch,
      matchSorterSearch,
      fuzzbunnySearch,
    ]
  );
}


function useFuse(ammenities: Ammenity[]){
  const fuse = useMemo(() => new Fuse(ammenities, {includeScore: true, keys: ["name"]}), [ammenities])
  return useCallback((query:string) => {
      if(query === '') return [];
      return fuse.search(query).map(r => r.item);
  }, [fuse]);
}


function useFlexsearch(ammenities: Ammenity[]){
  return useCallback((query:string) => {
    // const index = FlexSearch.create();
    // ammenities.forEach((h, i) => {
    //     index.add(i,h.name);
    // })
    return [];
    // return index.search(query);
  }, [ammenities]);
}

function useMatchSorter(ammenities: Ammenity[]){
  return useCallback((query:string) => {
    if(query === '') return [];
    return matchSorter(ammenities, query, {keys: ['name']})
  }, [ammenities]);
}


function useFuzzbunny(ammenities: Ammenity[]){
  return useCallback((query:string) => {
      if(query === '') return [];
      return fuzzyFilter(ammenities, query, {fields: [`name`]}).map(a => a.item);
  }, [ammenities]);
}

function useAmmenities(): Ammenity[]{
  return useMemo(()=>{
    const hotels = [
      "Hotel Riu Plaza España",
      "Hard Rock Hotel Madrid",
      "Hotel Maydrit Airport",
      "Senator Barajas",
      "Madrid Marriott Auditorium Hotel &amp; Conference Center",
      "Melia Barajas",
      "Hotel Regina",
      "Art Seven Hostel Capsules",
      "Hotel Nuevo Madrid",
      "Hotel Nuevo Boston",
      "Hotel Atlantico Madrid",
      "Hilton Madrid Airport",
      "Hotel Mediodia",
      "Pestana CR7 Gran Vía Madrid",
      "Hotel Europa",
      "Eurostars Madrid Tower",
      "Hotel Intur Palacio San Martin",
      "Room Mate Macarena - Gran Vía",
      "Hotel Princesa Plaza Madrid",
      "Hotel Madrid Alameda Aeropuerto, Affiliated by Meliá",
      "VP Plaza España Design",
      "Barceló Emperatriz",
      "Axor Barajas",
      "Hotel Madrid Gran Via 25 Affiliated by Meliá",
      "Barceló Torre de Madrid",
      "Barceló Imagine",
      "Radisson RED Madrid",
      "NH Collection Palacio de Tepa",
      "Hotel Emperador",
      "SLEEP’N Atocha – B Corp Certified",
      "NH Madrid Nacional",
      "Hotel Principe Pio",
      "Petit Palace Savoy Alfonso XII",
      "NH Madrid Barajas Airport",
      "ICON Embassy",
      "ibis budget Madrid Centro Lavapies",
      "Only YOU Boutique Hotel",
      "Hotel Porcel Ganivet",
      "Senator Castellana Hotel",
      "The Westin Palace, Madrid",
      "Hyatt Centric Gran Via Madrid",
      "NH Madrid Lagasca",
      "NH Villa de Coslada",
      "Axor Feria",
      "Pestana Plaza Mayor Madrid",
      "Hotel Santo Domingo",
      "room007 Select Sol",
      "NH Collection Madrid Suecia",
      "Hotel Liabeny",
      "Novotel Madrid Center",
      "H10 Puerta de Alcalá",
      "Hotel ILUNION Pio XII",
      "Rosewood Villa Magna",
      "NH Collection Madrid Gran Vía",
      "NH Collection Madrid Colón",
      "Hotel ILUNION Suites Madrid",
      "Agumar Hotel",
      "Hotel Claridge Madrid",
      "Hotel ibis Madrid Aeropuerto Barajas",
      "Axel Hotel Madrid - Adults Only",
      "NH Madrid Príncipe de Vergara",
      "Hostal Abadía Madrid",
      "Hotel Fenix Gran Meliá - The Leading Hotels of the World ",
      "Melia Avenida América",
      "NH Collection Paseo del Prado",
      "Catalonia Gran Via Madrid",
      "NH Collection Madrid Eurobuilding",
      "Urban",
      "Canopy by Hilton Madrid Castellana",
      "Room Mate Óscar",
      "Wellington Hotel &amp; Spa Madrid",
      "Far Home Bernabeu",
      "Only YOU Hotel Atocha",
      "Generator Madrid",
      "Le Petit Palü-Fuencarral",
      "ME Madrid by Melia",
      "Hotel Preciados",
      "TOC Hostel and Suites Madrid",
      "Hotel Clement Barajas",
      "C&amp;H Aravaca Garden",
      "Petit Palace President Castellana",
      "Hotel Exe Plaza",
      "The Principal Madrid",
      "Four Seasons Hotel Madrid",
      "Hotel ILUNION Alcalá Norte",
      "Casual del Teatro Madrid",
      "Relais &amp; Châteaux Heritage Madrid",
      "Air Rooms Madrid by Premium Traveller",
      "Hotel ILUNION Atrium",
      "Hotel Villa De Barajas"
  ]

  return hotels.map(h => ({name: h}))
  }, []);
}



const SearchResult = ({results, name}: {results: Ammenity[], name: string}) => {

  return (
    <div className="border-1 rounded-sm shadow-sm m-4 bg-white p-8">
        <span className="text-lg font-medium ">{name}</span>
        <table className="text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" className="px-2 py-2">#</th>
              <th scope="col" className="px-2 py-2">Nombre</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r,i) => (<tr key={i} className="border-b dark:border-neutral-500">
              <td className="whitespace-nowrap px-2 py-2 font-medium">{i}</td>
              <td className="px-2 py-2">{r.name}</td>
            </tr>))}
          </tbody>
        </table>
    </div>

  )

}