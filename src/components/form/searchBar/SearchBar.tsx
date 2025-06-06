import { useState } from "react";

interface Probs {
    onSearchChange: (searchTerm: string) => void;
}

const SearchBar = ({ onSearchChange }: Probs) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm); // Update the local state
        onSearchChange(newSearchTerm); // Notify the parent of the change
    };

    return (
        <div>
            <input type="text" onChange={handleChange}/>
        </div>
    )
}

export default SearchBar
