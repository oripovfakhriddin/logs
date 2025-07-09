const Spinner = ({
    size = "md",
    color = "primary",
}: {
    size?: "sm" | "md" | "lg" | "responsive"
    color?: "primary" | "secondary" | "primary-foreground"
}) => {
    return (
        <div
            className={`relative inline-flex items-center justify-center
             ${size === "sm" && "w-5 h-5"} ${size === "md" && "w-8 h-8"} ${size === "lg" && "w-10 h-10"} ${size === "responsive" && "w-8 h-8 md:w-10 md:h-10"} `}
        >
            <div
                className={`absolute w-full h-full rounded-full animate-[spin_0.8s_ease_infinite] border-solid border-t-transparent border-l-transparent border-r-transparent border-primary ${size === "sm" ? "border-2" : "border-[3px]"} ${color === "secondary" && "border-b-white"} ${color === "primary-foreground" && "border-b-primary-foreground"} `}
            />
            <div
                className={`absolute w-full h-full rounded-full opacity-75 animate-[spin_0.8s_linear_infinite]  border-dotted border-t-transparent border-l-transparent border-r-transparent border-primary 
            ${size === "sm" ? "border-2" : "border-[3px]"} ${color === "secondary" && "border-b-white"} ${color === "primary-foreground" && "border-b-primary-foreground"} `}
            />
        </div>
    )
}

export default Spinner
