
import React from 'react';
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,

} from "@/components/ui/table";
import { ExternalLink, Download } from "lucide-react";

function ProductTable({ products, inputUrl, nextpage, prevPage, csvExport }) {

    const titleLength = (text, maxLength) => {
        if (!text) return "N/A";
        if (text.length <= maxLength) {
            return text;
        }
        return text.slice(0, maxLength) + "...";
    };

    return (
        <div className="w-full max-w-5xl mx-auto my-10 px-4 md:px-0">
            {products && products.length > 0 ? (
                <div className="bg-card text-card-foreground rounded-xl shadow-lg overflow-hidden border">
                    <div className="p-3 border-b flex flex-col md:flex-row justify-between items-center gap-4">
                        <h2 className="text-xl font-semibold text-primary">
                            Total Products Found: {products.length}
                        </h2>
                        <div className="flex gap-3 flex-wrap justify-center">
                            <Button onClick={prevPage} variant="outline" disabled={!prevPage}>
                                Previous Page
                            </Button>
                            <Button onClick={nextpage} variant="outline" disabled={!nextpage}>
                                Next Page
                            </Button>
                            <Button onClick={csvExport} className="flex items-center gap-2">
                                <Download className="h-4 w-4" /> Export as CSV
                            </Button>
                        </div>
                    </div>

                    <div className="relative overflow-auto p-3">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[200px]">Product Name</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Tags</TableHead>
                                    <TableHead>Stock</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell className="font-medium">
                                            {titleLength(product.title, 50)}
                                        </TableCell>
                                        <TableCell>${parseFloat(product.variants[0]?.price || 0).toFixed(2)}</TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {product.tags && product.tags.length > 0 ? product.tags.join(" | ") : "N/A"}
                                        </TableCell>
                                        <TableCell>
                                            {product.variants[0]?.available === true ? (
                                                <span className="text-green-300 font-medium">Available</span>
                                            ) : (
                                                <span className="text-red-300 font-medium">Not Available</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <a
                                                href={`${inputUrl.endsWith('/') ? inputUrl.slice(0, -1) : inputUrl}/products/${product.handle}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-blue-600 hover:underline hover:text-blue-500 transition-colors"
                                            >
                                                View <ExternalLink className="h-3 w-3" />
                                            </a>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            {/* You could add a TableFooter here for summaries if needed */}
                        </Table>
                    </div>

                    {/* Example of how you could integrate Shadcn Pagination (currently not hooked up to logic) */}
                    {/* <div className="p-4 border-t flex justify-center">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious href="#" />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext href="#" />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div> */}

                </div>
            ) : (
                <div className="bg-card text-card-foreground rounded-xl shadow-lg p-8 text-center border">
                    <h3 className="text-2xl font-semibold mb-2">No Products Found Yet!</h3>
                    <p className="text-muted-foreground">
                        Enter a valid Shopify store URL in the search form above to begin fetching products.
                    </p>
                </div>
            )}
        </div>
    );
}

export default ProductTable;