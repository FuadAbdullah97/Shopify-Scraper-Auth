import React, { useState, useCallback } from 'react';
import SearchForm from "@/components/SearchForm.jsx";
import ProductTable from "@/components/ProductTable.jsx";
import { useLimitContext } from "@/context/ProductLimitContext.jsx";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from 'lucide-react';
import {UserProfile} from "@/components/UserProfile.jsx";

function Dashboard() {
    const [inputValue, setInputValue] = useState('');
    const [products, setProducts] = useState([]);
    const { productLimit } = useLimitContext();
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasMoreProducts, setHasMoreProducts] = useState(true);


    // useCallback to memoize getProduct, preventing unnecessary re-renders
    const getProduct = useCallback(async (urlInput, limit, page) => {
        setLoading(true);
        setError(null);
        setProducts([]);

        const sanitizedUrl = urlInput.endsWith('/') ? urlInput.slice(0, -1) : urlInput;
        const url = `${sanitizedUrl}/products.json?page=${page}&limit=${limit}`;

        try {
            const response = await fetch(url);

            if (!response.ok) {
                let errorMessage = `HTTP error! Status: ${response.status}. Could not fetch products.`;
                if (response.status === 404) {
                    errorMessage = "Shopify store not found or invalid URL. Please check the link.";
                } else if (response.status === 403) {
                    errorMessage = "Access denied. The store might require authentication or be password protected.";
                }
                throw new Error(errorMessage);
            }

            const data = await response.json();

            if (!data.products || data.products.length === 0) {
                setHasMoreProducts(false);
                if (page === 1) {
                    toast.info("No Products Found", {
                        description: "No products were found for the given Shopify store URL.",
                    });
                } else {
                    toast.info("End of Products", {
                        description: "You've reached the last page of products.",
                    });
                }
            } else {
                setProducts(data.products);
                setHasMoreProducts(data.products.length === limit);
                toast.success("Products Fetched Successfully", {
                    description: `Found ${data.products.length} products on page ${page}.`,
                });
            }

        } catch (err) {
            console.error("Error during product fetch:", err.message);
            setError(err.message || "Failed to fetch products. Please try again.");
            toast.error("Fetch Error", { // <--- Updated toast API for sonner
                description: err.message || "Failed to fetch products.",
            });
            setProducts([]);
            setHasMoreProducts(false);
        } finally {
            setLoading(false);
        }
    }, [productLimit]); // Removed `toast` from dependency array as it's now a direct import

    const formAction = (e) => {
        e.preventDefault();
        if (!inputValue) {
            toast.warning("Input Required", { // <--- Updated toast API for sonner
                description: "Please enter a Shopify store URL.",
            });
            return;
        }
        setCurrentPage(1);
        getProduct(inputValue, productLimit, 1);
    };

    const handleNextPage = () => {
        const newPage = currentPage + 1;
        setCurrentPage(newPage);
        getProduct(inputValue, productLimit, newPage);
    };

    const handlePrevPage = () => {
        const newPage = currentPage - 1;
        if (newPage >= 1) {
            setCurrentPage(newPage);
            getProduct(inputValue, productLimit, newPage);
        }
    };

    const escapeCsvValue = (value) => {
        if (value === null || value === undefined) return '""';
        let stringValue = String(value);
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
            stringValue = stringValue.replace(/"/g, '""');
            return `"${stringValue}"`;
        }
        return stringValue;
    };

    const exportToCsv = () => {
        if (products.length === 0) {
            toast.warning("No Products to Export", { // <--- Updated toast API for sonner
                description: "Please fetch some products first.",
            });
            return;
        }

        const headers = ['ID', 'Title', 'Price', 'Handle', 'Image URL', 'Tags', 'Stock Status'];

        const csvRows = products.map(product => {
            const id = escapeCsvValue(product.id);
            const title = escapeCsvValue(product.title);
            const price = escapeCsvValue(product.variants?.[0]?.price ?? 'N/A');
            const handle = escapeCsvValue(product.handle);
            const imageUrl = escapeCsvValue(product.images?.[0]?.src ?? 'N/A');
            const tags = escapeCsvValue(product.tags?.join(';') ?? 'N/A');
            const stockStatus = escapeCsvValue(product.variants?.[0]?.available ? 'In Stock' : 'Out of Stock');
            return `${id},${title},${price},${handle},${imageUrl},${tags},${stockStatus}`;
        });

        const csvContent = [headers.join(','), ...csvRows].join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${inputValue + currentPage }.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        toast.success("Export Successful", { // <--- Updated toast API for sonner
            description: `Successfully exported ${products.length} products to products.csv.`,
        });
    };


    return (
        <div className="container mx-auto py-8">
            {error && (
                <Alert variant="destructive" className="mb-6 max-w-4xl mx-auto">
                    <AlertCircleIcon className="h-4 w-4" />
                    <AlertTitle>Error!</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <SearchForm
                searchValue={inputValue}
                onInputChange={(e) => setInputValue(e.target.value)}
                submitAction={formAction}
                isLoading={loading}
            />


            <ProductTable
                products={products}
                inputUrl={inputValue}
                loading={loading}
                nextpage={handleNextPage}
                prevPage={handlePrevPage}
                csvExport={exportToCsv}
                canGoPrev={currentPage > 1}
                canGoNext={hasMoreProducts && products.length > 0}
            />

            <UserProfile />
        </div>
    );
}

export default Dashboard;