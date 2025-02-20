import { useState } from "react";
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

interface ISuggestions {
  place_id: number;
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
  const [suggestions, setSuggestions] = useState<ISuggestions[]>([
    {
      place_id: 38847950,
      licence:
        "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
      osm_type: "node",
      osm_id: 71556493,
      lat: "12.610368",
      lon: "37.466766",
      class: "place",
      type: "city",
      place_rank: 16,
      importance: 0.5105001941912447,
      addresstype: "city",
      name: "Gonder",
      display_name: "Gonder, North Gondar, Amhara Region, 6200, Ethiopia",
      address: {
        city: "Gonder",
        state_district: "North Gondar",
        state: "Amhara Region",
        "ISO3166-2-lvl4": "ET-AM",
        postcode: "6200",
        country: "Ethiopia",
        country_code: "et",
      },
      boundingbox: ["12.4503680", "12.7703680", "37.3067660", "37.6267660"],
    },
    {
      place_id: 264643158,
      licence:
        "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
      osm_type: "relation",
      osm_id: 4112133,
      lat: "41.4198914",
      lon: "-8.371297",
      class: "boundary",
      type: "administrative",
      place_rank: 16,
      importance: 0.39298651587942324,
      addresstype: "village",
      name: "Gondar",
      display_name: "Gondar, Guimarães, Braga, Portugal",
      address: {
        city: "Guimarães",
        country: "Portugal",
        country_code: "pt",
      },
      boundingbox: ["41.4107136", "41.4302443", "-8.3786149", "-8.3586597"],
    },
    {
      place_id: 264752440,
      licence:
        "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
      osm_type: "relation",
      osm_id: 5830054,
      lat: "41.2490072",
      lon: "-8.0269415",
      class: "boundary",
      type: "administrative",
      place_rank: 16,
      importance: 0.3448456713926686,
      addresstype: "village",
      name: "Gondar",
      display_name: "Gondar, Amarante, Porto, Portugal",
      address: {
        city: "Amarante",
        country: "Portugal",
        country_code: "pt",
      },
      boundingbox: ["41.2325934", "41.2722683", "-8.0428758", "-7.9996299"],
    },
    {
      place_id: 264914270,
      licence:
        "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
      osm_type: "node",
      osm_id: 3855623861,
      lat: "41.8206808",
      lon: "-8.7773041",
      class: "place",
      type: "village",
      place_rank: 19,
      importance: 0.2801407094383336,
      addresstype: "village",
      name: "Gondar",
      display_name: "Gondar, Caminha, Viana do Castelo, 4910-188, Portugal",
      address: {
        postcode: "4910-188",
        country: "Portugal",
        country_code: "pt",
      },
      boundingbox: ["41.8006808", "41.8406808", "-8.7973041", "-8.7573041"],
    },
    {
      place_id: 264763581,
      licence:
        "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
      osm_type: "node",
      osm_id: 3850531559,
      lat: "41.9122396",
      lon: "-8.6794927",
      class: "place",
      type: "village",
      place_rank: 19,
      importance: 0.2767003203257644,
      addresstype: "village",
      name: "Gondar",
      display_name:
        "Gondar, Vila Nova de Cerveira, Viana do Castelo, 4920-090, Portugal",
      address: {
        village: "Gondar",
        town: "Vila Nova de Cerveira",
        county: "Viana do Castelo",
        "ISO3166-2-lvl6": "PT-16",
        postcode: "4920-090",
        country: "Portugal",
        country_code: "pt",
      },
      boundingbox: ["41.8922396", "41.9322396", "-8.6994927", "-8.6594927"],
    },
  ]);

  return (
    <View className="flex justify-start items-center flex-col gap-4">
      <View
        className={`flex justify-center items-center flex-row gap-2  ${containerStyle}`}
      >
        <View className="justify-center items-center w-6 h-6">
          <Image
            source={icon ? icon : icons.search}
            className="w-6 h-6"
            resizeMode="contain"
          />
        </View>
        <TextInput
          // style={textInputBackgroundColor}
          placeholder="where do you want to go?"
          value={query}
          onChangeText={(text) => setQuery(text)}
        />
      </View>

      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <TouchableOpacity className="bg-white rounded-sm border-gray-100 border-2 py-2 flex justify-start items-center flex-row">
            <Image source={icons.arrowUp} />
            <Text className="font-Jakarta text-xl">{item.display_name}</Text>
          </TouchableOpacity>
        )}
        className="bg-white rounded-sm mt-2"
      />

      {/* <View className="relative flex justify-start items-center w-full">
        <View className="absolute z-50 w-full">
          <Text className="w-full py-2 px-2 bg-slate-50 text-gray-700 text-center">
            hager
          </Text>
          <Text className="w-full py-2 px-2 bg-slate-50 text-gray-700 text-center">
            hager
          </Text>
          <Text className="w-full py-2 px-2 bg-slate-50 text-gray-700 text-center">
            hager
          </Text>
          <Text className="w-full py-2 px-2 bg-slate-50 text-gray-700 text-center">
            hager
          </Text>
          <Text className="w-full py-2 px-2 bg-slate-50 text-gray-700 text-center">
            hager
          </Text>
          <Text className="w-full py-2 px-2 bg-slate-50 text-gray-700 text-center">
            hager
          </Text>
          <Text className="w-full py-2 px-2 bg-slate-50 text-gray-700 text-center">
            hager
          </Text>
          <Text className="w-full py-2 px-2 bg-slate-50 text-gray-700 text-center">
            hager
          </Text>
        </View>
      </View> */}
    </View>
  );
};

export default OSMTextInput;
