interface Props {
    text: string
}


const Button = ({ text }: Props) => {
    return (
        <button type="button" className="btn btn-primary" onClick={()=> console.log(text)}>{text}</button>
    )
}

export default Button