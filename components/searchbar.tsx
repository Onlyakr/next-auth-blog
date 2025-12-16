import { Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

const SearchBar = () => (
	<div className="hidden w-full max-w-xs sm:block">
		<InputGroup>
			<InputGroupInput placeholder="Search..." />
			<InputGroupAddon>
				<HugeiconsIcon icon={Search01Icon} />{" "}
			</InputGroupAddon>
		</InputGroup>
	</div>
);
export default SearchBar;
