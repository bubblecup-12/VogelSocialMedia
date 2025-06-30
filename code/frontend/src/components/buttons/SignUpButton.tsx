import { useNavigate } from "react-router-dom";
import ButtonRotkehlchen from "./buttonRotkehlchen/ButtonRotkehlchen";

export default function LogInButton() {
  const navigate = useNavigate();

  return (
    <ButtonRotkehlchen
      style={"secondary"}
      label={"Sign Up"}
      type={"button"}
      onClick={() => navigate("/login")}
    />
  );
}
