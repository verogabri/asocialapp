import { Link } from "@inertiajs/react";
import AppHeaderLink from "./app-header-link";
import AppHeaderLogo from "./app-header-logo";
import { Button } from "../ui/button";

export default function AppHeader() {
    return (
        <header>
            <div className="max-w-4xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <AppHeaderLogo />
                    <nav>
                        <div className="flex space-x-6 items-center">                            
                            <Button size="sm" >
                                <Link href="/posts/create" className="btn btn-primary">New Post</Link>
                            </Button>
                            <AppHeaderLink href="/">Home</AppHeaderLink>
                            <AppHeaderLink href="/about">About</AppHeaderLink>
                            <AppHeaderLink href="/posts">Posts</AppHeaderLink>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}