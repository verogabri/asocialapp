import { Link, usePage } from "@inertiajs/react";
import AppHeaderLink from "./app-header-link";
import AppHeaderLogo from "./app-header-logo";
import { Button } from "../ui/button";

import { create, index } from "@/actions/App/Http/Controllers/PostController";
import home from "@/routes/home";
import about from "@/routes/about";
import { PageProps } from "@/types";
import AppHeaderUserMenu from "./app-headerUserMenu";


export default function AppHeader() {

    const { auth } = usePage<PageProps>().props;

    return (
        <header>
            <div className="max-w-4xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <AppHeaderLogo />
                    <nav>
                        <div className="flex space-x-6 items-center">                            
                            
                            {auth.can.post.createPost && (
                                <Button size="sm" >
                                    <Link href={create()} className="btn btn-primary">New Post</Link>
                                </Button>
                            )}

                            <AppHeaderLink href={home.index().url}>Home</AppHeaderLink>
                            <AppHeaderLink href={about.index().url}>About</AppHeaderLink>
                            <AppHeaderLink href={index().url}>Posts</AppHeaderLink>
                            
                            {auth.user ? (
                                <AppHeaderUserMenu />
                            ) : (
                                <AppHeaderLink href="/auth/login">Login</AppHeaderLink>
                            )}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}