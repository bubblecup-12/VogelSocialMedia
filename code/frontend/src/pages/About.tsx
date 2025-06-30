import "./about.css";
import { useNavigate } from "react-router-dom";

function About() {
	const navigate = useNavigate();
	return (
		<div className="mainbox">
			<div className="intro">
				<div className="block">
					<div className="item text1 text-start">
						Bringing Birds closer to you
					</div>
					<img
						className="item item-end pic pic-justify"
						src="/assets/images/BirdOnCam.jpg"
						alt="A bird sitting on a camera"
					/>
				</div>
				<div className="block block2">
					<img
						className="item item-end grid-end pic2 pic"
						src="/assets/images/birdVeryInterestedFace.jpg"
						alt="A curious-interested looking cute bird"
					/>
					<div className="item text1 text-end grid-start text1">
						And the Birds you love
					</div>
				</div>
				<div className="block">
					<div className="item text1 text-start">Enhance your day</div>
					<img
						className="item item-end pic pic-justify"
						src="/assets/images/owlFancyFace.jpg"
						alt="A very confident looking owl"
					/>
				</div>
			</div>
			<div className="explain">
				<div
					className="explain-title generic-title cursor-pointer"
					onClick={() => navigate("/feed")}
				>
					Feather Feed
				</div>
				<div className="explain-text">
					... a social media platform about Birds.
					<br />
					Look up our
					<span
						className="color-orange cursor-pointer"
						onClick={() => navigate("/feed")}
					>
						{" "}
						Feed{" "}
					</span>
					and
					<span
						className="color-orange cursor-pointer"
						onClick={() => navigate("/register")}
					>
						{" "}
						Sign up{" "}
					</span>
					for your daily Feather Feed
				</div>
			</div>
		</div>
	);
}

export default About;
