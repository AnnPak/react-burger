
const LinkItem = (props) => {
    return(
        <a className={props.class} href="#">
            {props.children}
        </a>
            
       
    )
}

export default LinkItem;