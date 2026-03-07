
// import { Link } from '@inertiajs/react';

import AppLayout from '../layouts/app-layout';

export default function Home() {
    return (
        <AppLayout>
            
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-900">Welcome to the Home Page</h1>
                <p className="text-lg text-gray-600">This is the home page of our React application.</p>

            </div>
        </AppLayout>
    );
}
