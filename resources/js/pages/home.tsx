
import { Link } from '@inertiajs/react';

import AppLayout from '../layouts/app-layout';

export default function Home() {
    return (
        <AppLayout>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-4xl font-bold mb-4">Welcome to the Home Page</h1>
                <p className="text-lg text-gray-600">This is the home page of our React application.</p>
                <Link href="/about" className="text-blue-500 hover:underline mt-4">Go to About Page</Link>
            </div>
        </AppLayout>
    );
}
