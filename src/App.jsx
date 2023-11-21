import { Route, createRoutesFromElements, RouterProvider, createBrowserRouter } from "react-router-dom";
import Wallet from "./pages/walletUI";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route>
				<Route element={<PrivateRoutes />}>
					<Route path="/" element={<Wallet />} />
				</Route>
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
