'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export function LoginForm() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const { toast } = useToast();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) {
			toast({
				title: 'Error',
				description: error.message,
				variant: 'destructive',
			});
		} else {
			router.push('/dashboard');
		}
		setLoading(false);
	};

	return (
		<form onSubmit={handleLogin} className="space-y-4">
			<div>
				<Label htmlFor="email">Email</Label>
				<Input
					id="email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</div>
			<div>
				<Label htmlFor="password">Password</Label>
				<Input
					id="password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
			</div>
			<Button type="submit" disabled={loading}>
				{loading ? 'Loading...' : 'Log In'}
			</Button>
		</form>
	);
}
