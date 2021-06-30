import { History } from "history"

interface Props {
 history: History
}

const RegisterContainer =  (props: Props) => {
    return <div onClick={() => props.history.push("/app")}>
        register
    </div>
}


export default RegisterContainer;
