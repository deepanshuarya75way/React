interface Props {
    children: string
}


const Button = ({ children }: Props) => {
    return (
        <button type="button" className="btn btn-primary" onClick={()=> console.log(children)}>{children}</button>
    )
}

export default Button