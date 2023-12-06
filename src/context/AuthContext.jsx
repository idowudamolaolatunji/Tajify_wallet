import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
	// const secretKey = import.meta.env.VITE_CRYPTO_KEY;

	const [user, setUser] = useState(() =>
		Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
	);
	const [token, setToken] = useState(Cookies.get("token") || null);
	const [refetchHelp, setRefetchHelp] = useState(false);

	// FUNCTION TO REFETCH
	const handleRefetchHelp = () => {
		setRefetchHelp(!refetchHelp);
	};

	const handleChange = (user, token) => {
		setUser(user);
		setToken(token);
	};

	const handleUser = (user) => {
		setUser(user);
	};

	const logout = () => {
		fetch("http://localhost:3005/api/users/logout", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				Cookies.remove("user");
				Cookies.remove("token");
			})
			.catch((error) => {
				console.error(error);
				Cookies.remove("user");
				Cookies.remove("token");
			});
	};

	useEffect(() => {
		Cookies.set("user", JSON.stringify(user), { expires: 365 });
		Cookies.set("token", token, { expires: 365 });
	}, [user, token]);

	let contextData = {
		user: user,
		token: token,
		handleChange,
		handleUser,
		logout,
		refetchHelp,
		handleRefetchHelp,
	};

	return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
