import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import { FoodRecipesDataContextProvider } from '../context/FoodRecipesDataContext';

const PageLayout = () => {
    return (
        <FoodRecipesDataContextProvider>
            <Navbar />
            <Outlet />
        </FoodRecipesDataContextProvider>
    );
};

export default PageLayout;
