import styles from './CircleAnimationButton.module.css'

interface Props {
    label: string;
    onClick: (data: any) => void;
    data: any;
    [key: string]: any; // For additional props (like className, style, etc.)
}

const CircleAnimationButton = ({ label, onClick, data, ...props }: Props) => {
    const handleClick = () => {
        onClick(data);
    };
    
    return (
        <button onClick={handleClick} {...props}>
            {label}
        </button>
    )
}

export default CircleAnimationButton
