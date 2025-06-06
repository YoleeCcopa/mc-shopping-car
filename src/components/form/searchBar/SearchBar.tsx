import { useState } from "react";
import styles from "./SearchBar.module.css";

interface Probs {
    id: string;
    onSearchChange: (searchTerm: string) => void;
}

const SearchBar = ({ id: key, onSearchChange }: Probs) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm); // Update the local state
        onSearchChange(newSearchTerm); // Notify the parent of the change
    };

    const handleClear = () => {
        setSearchTerm(''); // Clear the local input state
        onSearchChange(''); // Notify parent that search is cleared
    };

    return (
        <div className={styles.search_bar}>
            <div className={styles.input_container}>
                <input className={styles.search_txt} id={key} 
                type="text" 
                onChange={handleChange}
                value={searchTerm}/>
                <button className={styles.clear_btn} onClick={handleClear}>Clear</button>
            </div>
            <label className={styles.label} htmlFor={key}>Search</label>
        </div>
    )
}

export default SearchBar
