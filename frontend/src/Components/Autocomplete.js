import { useState } from "react";

export default function NameSearch(props) {
	const [suggestions, setSuggestions] = useState([]);
	const [text, setText] = useState("");

	function send(i) {
		// console.log("picked:", i);
		// console.log("length:", suggestions.length);
		// console.log("length:", suggestions);

		if (suggestions.length > 0) {
			props.setSearchResults({
				selected: i,
				searchResults: suggestions,
			});
		} else
			try {
				parkSearchList.map((park) => {
					if (park.name == text) {
						// console.log("foundmyself");
						props.setSearchResults({
							selected: 0,
							searchResults: park,
						});
					}
				});
			} catch {
				props.setWarning(`Could not find park with name "${text}"`);
			}
	}
	function onKeyPress(e) {
		// console.log(e);
		if (e.key === "Enter") {
			send();
		}
	}
	const onSuggestHandler = (name, i) => {
		// console.log("name", name);
		// console.log("i", i);
		setText(name);
		send(i);
	};
	const onChangeHandler = (text) => {
		let matches = [];
		// console.log(text.length);

		if (text.length > 0) {
			matches = parkSearchList.filter((prk) => {
				const regex = new RegExp(`^${text}`, "gi");
				return prk.name.match(regex);
			});
			// console.log("matches", matches);
		}
		setSuggestions(matches);
		setText(text);
	};
	return (
		<div className="autocompleteContainer">
			<input
				className="searchBar"
				onChange={(e) => onChangeHandler(e.target.value)}
				value={text}
				placeholder="Ravenna Park"
				onKeyPress={onKeyPress}
				onBlur={() => {
					setTimeout(() => {
						setSuggestions([]);
					}, 500);
				}}
			/>
			<button className="button enter" onClick={() => send()}>
				Search
			</button>
			{suggestions &&
				suggestions.slice(0, 7).map((suggestion, i) => (
					<div
						key={i}
						className="suggestion"
						onClick={() => onSuggestHandler(suggestion.name, i)}>
						{suggestion.name}
					</div>
				))}
		</div>
	);
}

const parkSearchList = [
	{ name: "12th and Howe Play Park", id: 0 },
	{ name: "12th Ave S Viewpoint", id: 1 },
	{ name: "14th Ave NW Boat Ramp", id: 2 },
	{ name: "32nd Ave W Boat Launch", id: 3 },
	{ name: "6th Ave NW Pocket Park", id: 4 },
	{ name: "A. B. Ernst Park", id: 5 },
	{ name: "Adams Street Boat Ramp", id: 6 },
	{ name: "Albert Davis Park", id: 7 },
	{ name: "Alki Beach Park", id: 8 },
	{ name: "Belvoir Place", id: 9 },
	{ name: "Alvin Larkins Park", id: 10 },
	{ name: "Amy Yee Tennis Center", id: 11 },
	{ name: "Andover Place", id: 12 },
	{ name: "Arroyos Natural Area", id: 13 },
	{ name: "Atlantic City Boat Ramp", id: 14 },
	{ name: "Atlantic Street Park", id: 15 },
	{ name: "Baker Park on Crown Hill", id: 16 },
	{ name: "Ballard Commons Park", id: 17 },
	{ name: "Ballard Corners Park", id: 18 },
	{ name: "Bayview-Kinnear (Lower Kerry Park)", id: 19 },
	{ name: "Beer Sheva Park", id: 20 },
	{ name: "Bellevue Place", id: 21 },
	{ name: "Belltown Cottage Park", id: 22 },
	{ name: "Belvedere Park", id: 23 },
	{ name: "Bhy Kracke Park", id: 24 },
	{ name: "Bitter Lake Reservoir Open Space", id: 25 },
	{ name: "Blue Dog Pond", id: 26 },
	{ name: "Boren Park", id: 27 },
	{ name: "Bradner Gardens Park", id: 28 },
	{ name: "Burke-Gilman Trail", id: 29 },
	{ name: "Cal Anderson Park and Bobby Morris Playfield", id: 30 },
	{ name: "Colman Park", id: 31 },
	{ name: "Camp Long", id: 32 },
	{ name: "Carkeek Park", id: 33 },
	{ name: "Cedar Park", id: 34 },
	{ name: "Charles Richey Sr Viewpoint", id: 35 },
	{ name: "Chinook Beach Park", id: 36 },
	{ name: "Christie Park", id: 37 },
	{ name: "Coe Play Park", id: 38 },
	{ name: "College Street Park", id: 39 },
	{ name: "College Street Ravine", id: 40 },
	{ name: "Columbia Park", id: 41 },
	{ name: "Commodore Park", id: 42 },
	{ name: "Cormorant Cove", id: 43 },
	{ name: "Cottage Grove Park", id: 44 },
	{ name: "Cowen Park", id: 45 },
	{ name: "Crown Hill Glen", id: 46 },
	{ name: "Crown Hill Park", id: 47 },
	{ name: "Daejeon Park", id: 48 },
	{ name: "Dahl Playfield", id: 49 },
	{ name: "David Rodgers Park", id: 50 },
	{ name: "Day Street Boat Ramp", id: 51 },
	{ name: "Dearborn Park", id: 52 },
	{ name: "Denny Blaine Lake Park", id: 53 },
	{ name: "Denny Blaine Park", id: 54 },
	{ name: "Denny Park", id: 55 },
	{ name: "Discovery Park", id: 56 },
	{ name: "Fairview Park", id: 57 },
	{ name: "Fremont Canal Park", id: 58 },
	{ name: "Don Armeni Park", id: 59 },
	{ name: "Dr. Blanche Lavizzo Park", id: 60 },
	{ name: "Dr. Jose Rizal Park", id: 61 },
	{ name: "Duwamish Waterway Park", id: 62 },
	{ name: "East Montlake Park", id: 63 },
	{ name: "Eastmont Place", id: 64 },
	{ name: "Eddie Vine Boat Ramp", id: 65 },
	{ name: "Ercolini Park", id: 66 },
	{ name: "Fauntleroy Park", id: 67 },
	{ name: "Ferdinand Street Boat Ramp", id: 68 },
	{ name: "Firehouse Mini Park", id: 69 },
	{ name: "Flo Ware Park", id: 70 },
	{ name: "Freeway Park - Jim Ellis Freeway Park", id: 71 },
	{ name: "Hing Hay Park", id: 72 },
	{ name: "Fremont Peak Park", id: 73 },
	{ name: "Frink Park", id: 74 },
	{ name: "Jefferson Park", id: 75 },
	{ name: "Gas Works Park", id: 76 },
	{ name: "Genesee Park and Playfield", id: 77 },
	{ name: "Golden Gardens Park", id: 78 },
	{ name: "Green Lake Park", id: 79 },
	{ name: "Greenwood Park", id: 80 },
	{ name: "Greg Davis Park", id: 81 },
	{ name: "Harrison Ridge Greenbelt", id: 82 },
	{ name: "Herring's House Park (T'ul'altx)", id: 83 },
	{ name: "Hitt's Hill Park", id: 84 },
	{ name: "Homer Harris Park", id: 85 },
	{ name: "Horiuchi Park", id: 86 },
	{ name: "Howell Park", id: 87 },
	{ name: "Hubbard Homestead", id: 88 },
	{ name: "I-5 Colonnade", id: 89 },
	{ name: "Interbay Golf", id: 90 },
	{ name: "Interlaken Park", id: 91 },
	{ name: "International Children's Park", id: 92 },
	{ name: "Jackson Park Golf Course", id: 93 },
	{ name: "Japanese Garden", id: 94 },
	{ name: "Jefferson Park Golf Course", id: 95 },
	{ name: "John C. Little, Sr. Park", id: 96 },
	{ name: "Judkins Park and Playfield", id: 97 },
	{ name: "Katie Black's Garden", id: 98 },
	{ name: "Kerry Park", id: 99 },
	{ name: "Kinnear Park", id: 100 },
	{ name: "Kirke Park", id: 101 },
	{ name: "Kiwanis Memorial Preserve Park", id: 102 },
	{ name: "Kobe Terrace", id: 103 },
	{ name: "Kubota Garden", id: 104 },
	{ name: "Lake City Mini Park", id: 105 },
	{ name: "Lake People Park (Xacua'bs)", id: 106 },
	{ name: "Lake Union Park", id: 107 },
	{ name: "Lake Washington Boulevard", id: 108 },
	{ name: "Volunteer Park", id: 109 },
	{ name: "Lakeridge Park", id: 110 },
	{ name: "Lakeridge Playfield", id: 111 },
	{ name: "Lakeview Park", id: 112 },
	{ name: "Lakewood Moorage", id: 113 },
	{ name: "Lawton Park", id: 114 },
	{ name: "Leschi Park", id: 115 },
	{ name: "Leschi-Lake Dell Natural Area", id: 116 },
	{ name: "Licton Springs Park", id: 117 },
	{ name: "Lincoln Park", id: 118 },
	{ name: "Linden Orchard Park", id: 119 },
	{ name: "Little Brook Park", id: 120 },
	{ name: "Llandover Woods Greenspace", id: 121 },
	{ name: "Lowman Beach Park", id: 122 },
	{ name: "Lynn Street Mini Park", id: 123 },
	{ name: "MacLean Park", id: 124 },
	{ name: "Madison Park", id: 125 },
	{ name: "Madison Park North Beach", id: 126 },
	{ name: "Madrona Briar Patch", id: 127 },
	{ name: "Madrona Park", id: 128 },
	{ name: "Magnolia Greenbelt", id: 129 },
	{ name: "Magnolia Manor Park", id: 130 },
	{ name: "Magnolia Park", id: 131 },
	{ name: "Magnolia Tidelands Park", id: 132 },
	{ name: "Maple Leaf Community Garden", id: 133 },
	{ name: "Maple School Ravine", id: 134 },
	{ name: "Marra-Desimone Park", id: 135 },
	{ name: "Marshall Park", id: 136 },
	{ name: "Martha Washington Park", id: 137 },
	{ name: "Martin Luther King, Jr. Memorial", id: 138 },
	{ name: "Matthews Beach Park", id: 139 },
	{ name: "Mayfair Park", id: 140 },
	{ name: "McGilvra Boulevard", id: 141 },
	{ name: "Me-Kwa-Mooks Natural Area", id: 142 },
	{ name: "Me-Kwa-Mooks Park", id: 143 },
	{ name: "Mineral Springs Park", id: 144 },
	{ name: "Mock Creek Ravine", id: 145 },
	{ name: "Mt. Baker Park", id: 146 },
	{ name: "Mt. Claire Park", id: 147 },
	{ name: "Myrtle Edwards Park", id: 148 },
	{ name: "Myrtle Reservoir", id: 149 },
	{ name: "Nora's Woods", id: 150 },
	{ name: "North Beach Park", id: 151 },
	{ name: "North Passage Point Park", id: 152 },
	{ name: "Northacres Park", id: 153 },
	{ name: "Northeast Queen Anne Greenbelt", id: 154 },
	{ name: "Northgate Park", id: 155 },
	{ name: "Northlake Park", id: 156 },
	{ name: "Northwest 60th St. Viewpoint", id: 157 },
	{ name: "Observatory Courts", id: 158 },
	{ name: "Occidental Square", id: 159 },
	{ name: "Open Water Park", id: 160 },
	{ name: "Orchard Street Ravine", id: 161 },
	{ name: "Oxbow Park", id: 162 },
	{ name: "Parsons Gardens", id: 163 },
	{ name: "Peace Park", id: 164 },
	{ name: "Pelly Place Natural Area", id: 165 },
	{ name: "Piers 62 and 63", id: 166 },
	{ name: "Pigeon Point Park", id: 167 },
	{ name: "Pioneer Square", id: 168 },
	{ name: "Pipers Creek Natural Area", id: 169 },
	{ name: "Plum Tree Park", id: 170 },
	{ name: "Plymouth Pillars Park", id: 171 },
	{ name: "Powell Barnett Park", id: 172 },
	{ name: "Pratt Park", id: 173 },
	{ name: "Prefontaine Place", id: 174 },
	{ name: "Prentis I. Frazier Park", id: 175 },
	{ name: "Pritchard Island Beach", id: 176 },
	{ name: "Puget Boulevard Commons", id: 177 },
	{ name: "Puget Creek Greenspace", id: 178 },
	{ name: "Puget Park", id: 179 },
	{ name: "Queen Anne Boulevard", id: 180 },
	{ name: "Rainbow Point", id: 181 },
	{ name: "Sturtevant Ravine", id: 182 },
	{ name: "Ravenna Park", id: 183 },
	{ name: "Ravenna Woods", id: 184 },
	{ name: "Ravenna-Eckstein Park", id: 185 },
	{ name: "Regrade Park", id: 186 },
	{ name: "Riverview Playfield", id: 187 },
	{ name: "Roanoke Park", id: 188 },
	{ name: "Roanoke St. Mini Park", id: 189 },
	{ name: "Roxhill Park", id: 190 },
	{ name: "Salmon Bay Park", id: 191 },
	{ name: "Sam Smith Park", id: 192 },
	{ name: "Schmitz Preserve Park", id: 193 },
	{ name: "Seacrest Park", id: 194 },
	{ name: "Seola Park", id: 195 },
	{ name: "Seward Park", id: 196 },
	{ name: "Smith Cove", id: 197 },
	{ name: "Solstice Park", id: 198 },
	{ name: "Soundview Terrace", id: 199 },
	{ name: "South Passage Point Park", id: 200 },
	{ name: "Spring Street Mini Park", id: 201 },
	{ name: "Spruce Street Mini Park", id: 202 },
	{ name: "St. Mark's Greenbelt", id: 203 },
	{ name: "Stan Sayres Memorial Park", id: 204 },
	{ name: "Warren G. Magnuson Park", id: 205 },
	{ name: "Sturgus Park", id: 206 },
	{ name: "Sunnyside Ave N Boat Ramp", id: 207 },
	{ name: "Sunset Hill Park", id: 208 },
	{ name: "SW Queen Anne Greenbelt", id: 209 },
	{ name: "Terry Pettus Park", id: 210 },
	{ name: "Thorndyke Park", id: 211 },
	{ name: "Thornton Creek Park #1", id: 212 },
	{ name: "Thyme Patch Park", id: 213 },
	{ name: "Tilikum Place", id: 214 },
	{ name: "Trolley Hill Park", id: 215 },
	{ name: "Victor Steinbrueck Park", id: 216 },
	{ name: "Victory Creek Park", id: 217 },
	{ name: "View Ridge Playfield", id: 218 },
	{ name: "Viretta Park", id: 219 },
	{ name: "Volunteer Park Conservatory", id: 220 },
	{ name: "Ward Springs Park", id: 221 },
	{ name: "Washington Park Arboretum", id: 222 },
	{ name: "Washington Park Playfield", id: 223 },
	{ name: "Washington Street Public Boat Landing", id: 224 },
	{ name: "Waterfront Park", id: 225 },
	{ name: "Weather Watch Park", id: 226 },
];
