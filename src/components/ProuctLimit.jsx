import React from 'react';
import { useLimitContext } from "../context/ProductLimitContext.jsx";

// Import Shadcn UI Select components
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label"; // Also import Label for consistency

function ProductLimit({ id }) { // Accepting 'id' prop for improved accessibility
    const { productLimit, setProductLimit } = useLimitContext();

    const handleValueChange = (newValue) => {
        setProductLimit(newValue);
    };

    return (
        // Changed to grid gap-2 for consistent vertical spacing between label and select
        <div className="grid gap-2">
            {/*<Label htmlFor={id || "product-limit"}>Product Limit</Label>*/}
            <Select onValueChange={handleValueChange} value={String(productLimit)}>
                <SelectTrigger
                    id={id || "product-limit"}
                    className="w-full h-10" // <-- Ensure h-10 is applied here
                >
                    <SelectValue placeholder="Select a limit" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="30">30</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                    <SelectItem value="200">200</SelectItem>
                    <SelectItem value="250">250</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}

export default ProductLimit;