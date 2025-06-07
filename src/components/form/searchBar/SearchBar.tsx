import { useState } from "react";
import styles from "./SearchBar.module.css";
import "./../../../assets/_icon.css";

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
            <input className={styles.search_txt}
            id={key} 
            type="text" 
            onChange={handleChange}
            value={searchTerm}
            aria-describedby={`${key}-label`}/>

            <div className={styles.input_actions}>
            {searchTerm ? (
                <button
                className={styles.clear_btn}
                onClick={handleClear}
                aria-label="Clear search term">
                    <i className="uil__multiply"></i>
                </button>
            ) : (
                <label
                className={styles.label}
                htmlFor={key}
                id={`${key}-label`}>
                    <i className="uil__search-alt" aria-hidden="true"></i>
                    <span className={styles.sr_only}>Search product</span>
                </label>
            )}
            </div>
        </div>
    )
}

export default SearchBar
