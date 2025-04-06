'use client';
import { useState, useEffect } from 'react';

import { Empleado, columns } from './columns';
import { DataTable } from './data-table';
import { supabase } from '@/lib/supabase';

async function getData(): Promise<Empleado[]> {
	// Fetch data from your API here.

	const { data, error } = await supabase.from('empleados').select('*');
	console.log('data:', data);
	console.log('error:', error);

	// getdata from api

	return [];
}

export default function DemoPage() {
	const [data, setData] = useState<Empleado[]>([]);

	useEffect(() => {
		async function fetchData() {
			const result = await getData();
			setData(result);
		}
		fetchData();
	}, []);

	return (
		<div className="container mx-auto py-10">
			<DataTable columns={columns} data={data} />
		</div>
	);
}
