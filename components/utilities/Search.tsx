"use client"

import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useState } from 'react'
import { useFetchData, fetchQuery } from '@/api/hooks'

const Search = () => {
    interface QueryResults {
        name: string,
        queue_status: string,
        date_queued: Date
    }


    const { error: fetchError, fetchData } = useFetchData()
    const { error: queryError, searchData } = fetchQuery()
    const [isLoading, setIsLoading] = useState(false)
    const [results, setResults] = useState<QueryResults[]>([]);
    const [searchValue, setSearchValue] = useState('')

    const handleSearch = async (value: string) => {
        setIsLoading(true);

        if (value.length !== 0) {
            try {
                const response = await searchData(
                    'LOCAL',
                    'METHOD',
                    'QUERY',
                    'Queue',
                    `${value}`
                )
                if (response) {
                    setResults(response);
                    console.log(results)
                } else {
                    setResults([]);
                }
            } catch (err) {
                
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        handleSearch(value);
    };

    return (
    <div className="mt-24 py-2 sub-container w-full">
        <p className="text-dark-600 xl:text-left mb-4">Think you missed your queue?</p>
        <div className="flex flex-col max-w-[600px] items-center space-x-2">
            <Input
                type="search"
                placeholder="Search Number..."
                value={searchValue}
                onChange={handleInputChange}
                className="shad-input"
            />

            {fetchError && <div>Error: {fetchError}</div>}
            <div className="shad-select-trigger">
                {results.length > 0 ? (
                    <ul className="space-y-2">
                        {results.map((result, index) => (
                            <li key={index} className="bg-dark-300 p-2 rounded-md hover:bg-dark-200 transition">
                                {result.name}
                            </li>
                        ))}
                    </ul>
                ) : (
                    !isLoading && <div className="text-gray-500 text-center">No results found</div>
                )}
            </div>
        </div>
    </div>
    )
}

export default Search