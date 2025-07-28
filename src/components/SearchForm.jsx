import React  from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react"; // Using a search icon


import ProuctLimit from "@/components/ProuctLimit.jsx";

function SearchForm({ searchValue, onInputChange, submitAction }) {
    return (
        <Card className="w-full max-w-4xl mx-auto mt-10 p-6 shadow-lg rounded-xl">
            <CardHeader className="text-center pb-4">
                <CardTitle className="text-3xl font-bold">Shopify Product Scraper</CardTitle>
                <CardDescription className="text-md text-muted-foreground">
                    Enter your Shopify store URL and limit to fetch products.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={submitAction} className="flex flex-col md:flex-row items-end gap-4 md:gap-6">
                    {/* Store URL Input */}
                    <div className="flex-1 space-y-2">
                        <Label htmlFor="url-input">Shopify Store URL</Label>
                        <Input
                            id="url-input"
                            type="url" // Use type="url" for better validation
                            placeholder="e.g. your-store.myshopify.com"
                            value={searchValue}
                            onChange={onInputChange}
                            required
                            className="h-10" // Ensure consistent height
                        />
                    </div>

                    <div className="w-full md:w-auto flex flex-col justify-end gap-2">
                        <Label htmlFor="product-limit">Product Limit</Label>
                        <ProuctLimit id="product-limit" className="h-10" />
                    </div>


                    <Button type="submit" className="h-10 px-6 w-full md:w-auto">
                        <Search />Fetch
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

export default SearchForm;
