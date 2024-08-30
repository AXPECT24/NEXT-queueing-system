"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import { fetchQuery } from '@/api/hooks'

const Queue = () => {
    interface QueueItem {
        name: string
    }

    const { error, searchData, filterData } = fetchQuery()
    const [ isServing, setIsServing ] = useState<QueueItem[]>([])
    
    const fetchData = async () => {
        const res = await filterData(
            'LOCAL',
            'RESOURCE',
            'Queue',
            '[["queue_status", "=", "Serve"]]'
        )
        setIsServing(res)
    }   

    useEffect(() => {
        fetchData();
    }, [])
    
    return (
    <div className="space-y-20 sub-container w-1/2">
        <div className="mt-12 space-y-4">
            <p className="text-lg text-dark-600 mb-6">We are currently serving:</p>
            <div className="flex flex-col space-y-4">
                {isServing.map((item, index) =>(
                    <p key={index} className="text-7xl">{item.name}</p>
                ))}
            </div>
        </div>
    </div>
    )
}

export default Queue