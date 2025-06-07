import styles from './AnimatedButton.module.css'
import './../../../assets/_icon.css'

interface Props {
    label: string | React.ReactNode;
    iconClass?: string;
    backgroundEffect: "slide" | "circle";
    handleClick: (data?: any) => void;
    data?: any;
}

const AnimatedButton = ({ label, iconClass, handleClick: onClick, backgroundEffect, data }: Props) => {
    const hasIcon = !!iconClass;
    const isTextOnly = typeof label === 'string';

    // Logic for padding
    let paddingClass = styles.animated_btn;

    if (hasIcon && isTextOnly) {
        paddingClass = styles.animated_icon_txt;
    } else if (hasIcon && !isTextOnly) {
        paddingClass = styles.animated_icon;
    }

    const handleClick = () => {
        onClick(data);
    };
    
    return (
        <button
            onClick={handleClick}
            className={`${paddingClass} ${styles[backgroundEffect]}`}
        >
            {hasIcon && <i className={iconClass}></i>}
            {label}
        </button>
    )
}

export default AnimatedButton