import { Link } from '@inertiajs/react';

import AppLayout from '../layouts/app-layout';

export default function About() {
    return (
        <AppLayout>
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-900">About Us</h1>
                <p className="text-lg text-gray-600">This is the about page of our React application.</p>
                
            </div>
        </AppLayout>
    );
}