import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {getWeb3, MARKETPLACE_CONTRACT_ABI, MARKETPLACE_CONTRACT_ADDRESS} from "../config/config";
import {setAccount, setContract, setEthCours, setUser} from "../store/actions";
import Header from "../components/Header/header";
import CreateNftPage from "../pages/CreateNftPage/CreateNftPage";
import ExploreNftsPage from "../pages/ExploreNftsPage/ExploreNftsPage";
import {getNftsAction} from "../store/actions/middlewares/nftsAction";
import NftPage from "../pages/NftPage/NftPage";
import ProfilPage from "../pages/ProfilPage/ProfilPage";
import {getCategoriesAction} from "../store/actions/middlewares/categoriesAction";
import CreateCategoryPage from "../pages/CreateCategoryPage/CreateCategoryPage";
import CategoryPage from "../pages/CategoryPage/CategoryPage";
import ExploreCategoriesPage from "../pages/ExploreCategoriesPage/ExploreCategoriesPage";

import './App.css';
import HomePage from "../pages/HomePage/HomePage";


const web3 = getWeb3();
const App = () => {
    const dispatch = useDispatch()
    const account = useSelector(state => state.account)

  useEffect(() => {
    async function load() {
      dispatch(getNftsAction())
      dispatch(getCategoriesAction())
      const accounts = await web3.eth.requestAccounts();
      dispatch(setAccount(accounts[0]));
      const marketplaceContract = new web3.eth.Contract(MARKETPLACE_CONTRACT_ABI, MARKETPLACE_CONTRACT_ADDRESS)
      dispatch(setContract(marketplaceContract));
      const cours = await axios.get("https://min-api.cryptocompare.com/data/price?fsym=eth&tsyms=EUR")
      dispatch(setEthCours(cours.data.EUR))
      const token = window.localStorage.getItem("geekNft")
      if(token) {
        axios.get("http://localhost:8080/auth/validate-token?jwt=" + token)
            .then(res => dispatch(setUser(res.data)))
            .catch(() => window.localStorage.removeItem("geekNft"))
      }
    }
    load()
    window.ethereum?.on("accountsChanged", handleAccountChange);
    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountChange);
    };
  }, [dispatch])

  const handleAccountChange = async() => {
    const accounts = await web3.eth.requestAccounts();
    if(accounts[0] !== account) {
      dispatch(setAccount(accounts[0]));
      dispatch(setUser(null))
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/explore" element={<ExploreNftsPage/>} />
          <Route path="/explore-categories" element={<ExploreCategoriesPage/>} />
          <Route path="/create" element={<CreateNftPage/>} />
          <Route path="/create-category" element={<CreateCategoryPage/>} />
          <Route path="/mes-nft" element={<ProfilPage/>} />
          <Route path="/details/:id" element={<NftPage/>} />
          <Route path="/category/:id" element={<CategoryPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
