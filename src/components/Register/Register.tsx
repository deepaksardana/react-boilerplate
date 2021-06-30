import { History } from "history"

interface Props {
 history: History
}

export default (props: Props) => {
    return <div onClick={() => props.history.push("/app")}>
        register
    </div>
}