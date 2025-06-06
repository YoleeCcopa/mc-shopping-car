import styles from './AnimatedButton.module.css'

interface Props {
    label: string;
    backgroundEffect: "slide" | "circle";
    onClick: (data?: any) => void;
    data?: any;
}

const AnimatedButton = ({  label,backgroundEffect, onClick, data }: Props) => {
    const handleClick = () => {
        onClick(data);
    };
    
    return (
        <button onClick={handleClick} 
        className={`${styles.animated_btn} ${styles[backgroundEffect]}`}>
            {label}
        </button>
    )
}

export default AnimatedButton