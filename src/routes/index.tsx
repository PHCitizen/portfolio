import { createFileRoute } from "@tanstack/react-router";
import DesktopStory from "../components/DesktopStory";

export const Route = createFileRoute("/")({ component: Portfolio });

function Portfolio() {
	return <DesktopStory />;
}
