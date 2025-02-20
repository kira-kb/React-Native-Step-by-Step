import { useEffect, useState } from "react";
import { calculateRegion, generateMarkersFromData } from "../lib/map";
import { useDriverStore, useLocationStore } from "../store";
import { Platform, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { MarkerData } from "../types/type";
import { icons } from "../constants";

const drivers = [
  {
    id: "1",
    first_name: "James",
    last_name: "Wilson",
    profile_image_url:
      "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
    car_image_url:
      "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
    car_seats: 4,
    rating: "4.80",
  },
  {
    id: "2",
    first_name: "David",
    last_name: "Brown",
    profile_image_url:
      "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
    car_image_url:
      "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
    car_seats: 5,
    rating: "4.60",
  },
  {
    id: "3",
    first_name: "Michael",
    last_name: "Johnson",
    profile_image_url:
      "https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/826x822/",
    car_image_url:
      "https://ucarecdn.com/289764fb-55b6-4427-b1d1-f655987b4a14/-/preview/930x932/",
    car_seats: 4,
    rating: "4.70",
  },
  {
    id: "4",
    first_name: "Robert",
    last_name: "Green",
    profile_image_url:
      "https://ucarecdn.com/fdfc54df-9d24-40f7-b7d3-6f391561c0db/-/preview/626x417/",
    car_image_url:
      "https://ucarecdn.com/b6fb3b55-7676-4ff3-8484-fb115e268d32/-/preview/930x932/",
    car_seats: 4,
    rating: "4.90",
  },
];

const Map = () => {
  const {
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();

  const { selectedDriver, setSelectedDriver } = useDriverStore();
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  // console.log("map.tsx lat", userLatitude);
  // console.log("map.tsx log", userLongitude);
  // console.log("map.tsx des lat", destinationLatitude);
  // console.log("map.tsx des log", destinationLongitude);

  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });

  // console.log("user lat, log: ***  ", userLatitude, userLongitude);
  // console.log("selectedDriver", selectedDriver);

  useEffect(() => {
    if (drivers.length < 1) return;
    // console.log("mrkers:** ", markers);
    // console.log("drivers:** ", drivers);
    if (Array.isArray(drivers)) {
      if (!userLatitude || !userLongitude) return;

      const newMarkers = generateMarkersFromData({
        data: drivers,
        userLatitude,
        userLongitude,
      });

      setMarkers(newMarkers);
    }
  }, []);

  // Check if region is valid
  // if (
  //   !region ||
  //   !region.latitude ||
  //   !region.longitude ||
  //   !region.latitudeDelta ||
  //   !region.longitudeDelta
  // ) {
  //   // Optionally, log the missing data
  //   console.log("Region data is missing or incomplete");
  //   return (
  //     <View>
  //       <Text>Something went wrong, please refresh your page</Text>
  //     </View>
  //   ); // Return null or a loading indicator until region is ready
  // }

  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      // className="w-full h-full rounded-2xl"
      style={styles.map}
      tintColor="black"
      mapType={Platform.OS === "android" ? "terrain" : "mutedStandard"}
      showsPointsOfInterest={false}
      // region={region}
      initialRegion={region}
      showsUserLocation={true}
      userInterfaceStyle="light"
    >
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.title}
          image={
            selectedDriver === marker.id ? icons.selectedMarker : icons.marker
          }
        />
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: "100%",
    width: "100%",
    borderRadius: 16,
  },
});

export default Map;
