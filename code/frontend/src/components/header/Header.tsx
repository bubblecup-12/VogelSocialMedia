import "./header.css";
import React, { useState } from "react";
import {
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	SwipeableDrawer,
} from "@mui/material";
import Box from "@mui/material/Box";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FollowTheSignsIcon from "@mui/icons-material/FollowTheSigns";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../api/Auth";

function Header() {
	interface ListItemAttributes {
		text: string;
		icon: React.ElementType;
		onClick: () => void;
		onlyShowWhen: "loggedIn" | "loggedOut" | "always";
	}
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);
	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};
	const { logout, user } = useAuth();
	const ListItems: ListItemAttributes[] = [
		{
			text: "Feed",
			icon: DynamicFeedIcon,
			onClick: () => navigate("/feed", { replace: true }),
			onlyShowWhen: "always",
		},
		{
			text: "Create Post",
			icon: AddAPhotoIcon,
			onClick: () => navigate("/createpost", { replace: true }),
			onlyShowWhen: "loggedIn",
		},
		{
			text: "Profile",
			icon: PersonIcon,
			onClick: () => navigate("/profile", { replace: true }),
			onlyShowWhen: "loggedIn",
		},
		{
			text: "About",
			icon: InfoIcon,
			onClick: () => navigate("/about", { replace: true }),
			onlyShowWhen: "always",
		},
		{
			text: "Log Out",
			icon: LogoutIcon,
			onClick: logout,
			onlyShowWhen: "loggedIn",
		},
		{
			text: "Log In",
			icon: ExitToAppIcon,
			onClick: () => navigate("/login", { replace: true }),
			onlyShowWhen: "loggedOut",
		},
		{
			text: "Sign Up",
			icon: FollowTheSignsIcon,
			onClick: () => navigate("/register", { replace: true }),
			onlyShowWhen: "loggedOut",
		},
	];

	const DrawerList = (
		<Box role="menu" onClick={() => setIsOpen(false)}>
			<List className="drawer-list">
				{ListItems.map((ListItemObject, index) =>
					ListItemObject.onlyShowWhen == "always" ||
					(ListItemObject.onlyShowWhen == "loggedIn" && user) ||
					(ListItemObject.onlyShowWhen == "loggedOut" && !user) ? (
						<ListItem
							className="drawer-list-item"
							key={ListItemObject.text}
							disablePadding
						>
							<ListItemButton
								className="drawer-list-item-button"
								onClick={ListItemObject.onClick}
							>
								<ListItemIcon className="drawer-list-item">
									{React.createElement(ListItemObject.icon)}
								</ListItemIcon>
								<ListItemText
									className="drawer-list-item"
									primary={ListItemObject.text}
								/>
							</ListItemButton>
						</ListItem>
					) : null
				)}
			</List>
		</Box>
	);

	return (
		<>
			<header className="base-header blue-background">
				<img
					className="header-icon header-icon-feather"
					src="/assets/icons/BirdIconO.ico"
					alt="featherIcon"
				/>
				<p className="header-title small-title">Feather Feed</p>
				<img
					className="header-icon header-icon-menu"
					src="/assets/icons/menu_orange.svg"
					alt="menu"
					onClick={toggleMenu}
				/>
			</header>
			<SwipeableDrawer
				anchor={"right"}
				open={isOpen}
				onClose={() => setIsOpen(false)}
				onOpen={() => setIsOpen(true)}
			>
				{DrawerList}
			</SwipeableDrawer>
		</>
	);
}

export default Header;
