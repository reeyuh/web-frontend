"use client";

import Table from "@/components/table";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SECURITY_COLUMNS } from "@/data/securityData";
import { apiList } from "@/utils";
import { useRouter } from "next/navigation";
import sample from './SampleData.json';

export default function SecurityTable() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const page = searchParams.get("page") || 1;

    const [data, setData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(parseInt(page));
    const itemsPerPage = 10;
    const totalRecords = 12;

    function calculateIndices(pageNumber) {
        const startIndex = (pageNumber - 1) * itemsPerPage;
        const lastIndex = Math.min(startIndex + itemsPerPage - 1, totalRecords - 1);
        return { startIndex, lastIndex };
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${apiList.securityTable}&offset=${(currentPage - 1) * itemsPerPage}&limit=${itemsPerPage}`
                );
                const result = await response.json();
                if (result.docs) {
                    setData(result.docs);
                    setTotalCount(result.numFound);
                }
            } catch (error) {
                const { startIndex, lastIndex } = calculateIndices(currentPage);
                setData(sample.slice(startIndex, lastIndex));
                setTotalCount(sample.length);
                console.error("Error fetching security data:", error);
            }
        };

        fetchData();
    }, [currentPage]);

    const handlePaginationChange = (event, page) => {
        const { startIndex } = calculateIndices(page);
        setData(sample.slice(startIndex));
        router.push(`?page=${page}`);
    };

    return (
        <Table
            pagination={{
                numberOfPages: Math.ceil(totalCount / itemsPerPage),
                currentPage: totalCount > 0 ? currentPage : 0,
                count: totalCount,
                handleChange: handlePaginationChange,
            }}
            columns={SECURITY_COLUMNS}
            data={data}
        />
    );
}
