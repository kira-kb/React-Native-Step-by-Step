import { useEffect, useState } from "react";
import { icons } from "../constants";
import { GoogleInputProps } from "../types/type";
import {
  View,
  TextInput,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

import axios from "axios";

interface ISuggestions {
  place_id: string;
  lat: string;
  lon: string;
  type: string;
  addresstype: string;
  name: string;
  display_name: string;
  address: {
    city?: string;
    state_district?: string;
    state?: string;
    "ISO3166-2-lvl4"?: string;
    postcode?: string;
    country?: string;
    country_code?: string;
  };
}

const OSMTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<ISuggestions[]>([]);
  const [shouldSearch, setShouldSearch] = useState(true);

  const searchOSMPlaces = async (searchTerm: string) => {
    if (searchTerm.length > 2) {
      try {
        // Bounding box for Ethiopia
        const southWestLat = 3.4;
        const southWestLon = 32.9;
        const northEastLat = 14.9;
        const northEastLon = 47.9;

        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?q=${searchTerm}&format=json&addressdetails=1&limit=5&viewbox=${southWestLon},${northEastLat},${northEastLon},${southWestLat}&bounded=1`,
          {
            headers: {
              "User-Agent": "ETRYDE/1.0 (kirubelbewket@gmail.com)", // Use your app name and a valid email
            },
          },
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching OSM places:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    if (shouldSearch) searchOSMPlaces(query);
  }, [shouldSearch, query]);

  const handleSuggestionPress = (item: ISuggestions) => {
    setShouldSearch(false);
    // console.log("item: **  ", item);

    // ? //////////////////////////////////////////////////////////////
    // console.log("suggestions clicked");
    const location = {
      latitude: +item.lat,
      longitude: +item.lon,
      address: item.display_name,
    };
    handlePress(location);
    // console.log("location:  **  ", location);
    // ? ///////////////////////////////////////////////////////////

    setQuery(item.display_name); // Update the query with the selected place
    setSuggestions([]); // Clear suggestions after selection
  };

  const handleTextInput = (text: string) => {
    setQuery(text);
    setShouldSearch(true);
  };

  return (
    <View className="flex justify-start items-center flex-col gap-4 w-full">
      <View
        className={`flex justify-center items-center flex-row gap-2 w-[98%]  ${containerStyle}`}
      >
        <View className="justify-center items-center w-6 h-6">
          <Image
            source={icon ? icon : icons.search}
            className="w-6 h-6"
            resizeMode="contain"
          />
        </View>
        <TextInput
          className="w-[95%]"
          placeholder={initialLocation || "Where do you want to go?"}
          value={query}
          onChangeText={(text) => handleTextInput(text)}
        />
      </View>

      {suggestions.length > 0 && (
        <View className="bg-white rounded-sm mt-2 my-3">
          {suggestions.map((item) => (
            <TouchableOpacity
              key={item.place_id} // Add a unique key to avoid warnings
              className="bg-white rounded-sm border-gray-100 border-2 py-2 flex justify-start items-center flex-row"
              onPress={() => handleSuggestionPress(item)}
            >
              <Image source={icons.arrowUp} className="mr-1 rotate-90" />
              <Text className="font-Jakarta text-xl">{item.display_name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="bg-white rounded-sm border-gray-100 border-2 py-2 flex justify-start items-center flex-row"
              onPress={() => handleSuggestionPress(item)}
            >
              <Image source={icons.arrowUp} className="mr-1 rotate-90" />
              <Text className="font-Jakarta text-xl">{item.display_name}</Text>
            </TouchableOpacity>
          )}
          className="bg-white rounded-sm mt-2 my-3"
        />
      )} */}
    </View>
  );
};

export default OSMTextInput;
