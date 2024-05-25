import { useLoaderData } from "react-router-dom";
import Carousel from "../Components/Carousel";
import TabCategories from "../Components/TabCategories";
import MortgageForm from "../Components/MortgageForm";


const Home = () => {

    return (
        <div>
            <Carousel></Carousel>
            <TabCategories></TabCategories>
        </div>
    );
};

export default Home;