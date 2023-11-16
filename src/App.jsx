import { Route, createRoutesFromElements, RouterProvider, createBrowserRouter } from "react-router-dom";
import Wallet from "./pages/walletUI";

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route>
				<Route path="/" element={<Wallet />} />
			</Route>,
		),
		{ basename: "/wallet" },
	);

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
