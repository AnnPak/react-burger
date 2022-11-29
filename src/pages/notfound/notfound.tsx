import { FC } from "react";
import { Link } from "react-router-dom";

const NotFound: FC = () => {
    return (
        <section>
            <p className="text text_type_main-large mt-20">404 NOT FOUND</p>
            <Link className="text text_type_main-small" to="/">
                Вернуться на главную
            </Link>
        </section>
    );
};

export default NotFound;
