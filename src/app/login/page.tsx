import { LoginForm } from '@/components/login-form';

function LoginPage() {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="p-8 bg-white rounded-lg shadow-md w-96">
				<h1 className="text-2xl font-bold mb-6 text-center">Log In</h1>
				<LoginForm />
			</div>
		</div>
	);
}

export default LoginPage;
