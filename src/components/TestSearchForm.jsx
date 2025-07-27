import React from 'react';
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Button} from "@/components/ui/button.jsx";
function TestSearchForm(props) {
    return (
        <div className={"flex flex-row justify-center items-center h-screen"}>
            <div className={'flex flex-row gap-5 justify-center items-center w-2xl'}>
                <Input type="url" placeholder="Your Shopify Store URL" />
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
                <Button >Get Product Data</Button>
            </div>
        </div>

    );
}

export default TestSearchForm;