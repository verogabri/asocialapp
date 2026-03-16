import { ReactNode, useEffect } from 'react';  

import AppHeader from '../components/header/app-header';    
import { Toaster } from '@/components/ui/sonner';
import { usePage } from "@inertiajs/react";
import { toast } from 'sonner';
import { PageProps } from '@/types';

interface AppLayoutProps {  
    children: ReactNode;
};


export default function AppLayout({ children }: AppLayoutProps) {

    const {flash} = usePage<PageProps>().props;

    useEffect(() => {
        if(flash){
        

        console.log('this is flash', flash);
        alert("AppLayout mounted!!");
        }
        

        if(flash && flash.success) {
            toast.success(flash.success, {
                            description: flash.success,
                            position: "top-center",
                            duration: 8000,
                        });
            
        }
        if(flash && flash.error) {
            toast.error(flash.error, {
                duration: 4000,
            });
        }
    }, [flash]);

    
    return (
        <div className="bg-gray-50 min-h-screen">
            <AppHeader />
            
            <main className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    {children}
                </div>
            </main>
            <Toaster />
            
        </div>
    );
}