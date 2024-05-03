import { images } from "../iconImage";
import "../style/list.css";

const EmptyForm = () => {
    return (
        <div className="emptyFrom">
            <img src={images.empty} />
        <span>You have no to-dos</span>
        </div>
    );
}
export default EmptyForm;