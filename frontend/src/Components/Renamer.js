//reads in two arrays, one with matched parks (matches), one with all the features (allFeatures)
export default function Renamer(matchedParks, FeaturesList) {
	//for each match
	matchedParks.map((park) => {
		//make an array to help remove repeated features
		let oldfeatures = [];
		//get each fid
		park.fids.map((fid, i) => {
			//make temp var to store feature name
			let newname = "";
			//if fid isn't repeated
			if (!oldfeatures.includes(fid)) {
				//add fid to list
				oldfeatures.push(fid);

				//compare against allFeatures
				FeaturesList.map((feature) => {
					//if match
					if (feature.fid == fid) {
						newname = feature.name; //replace number with name
					}
				});
				//set that new name
				park.fids[i] = newname;
			}
		});
		//filter out the repeated filters (ones that didn't get converted to a string)
		park.fids = park.fids.filter((id) => typeof id == "string");
		return park;
	});
	return matchedParks;
}
