import Spacing from "@/constants/Spacing";
import moment from "moment-hijri";
import React from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Agenda, AgendaEntry, DateData } from "react-native-calendars";
import events from "../../assets/events.json";

const MyCalendar = () => {
  const renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? "black" : "#43515c";

    return (
      <Pressable
        style={[styles.item, { height: reservation.height }]}
        onPress={() => Alert.alert(reservation.name)}
      >
        <Text style={{ fontSize, color }}>{reservation.name}</Text>
      </Pressable>
    );
  };

  // Function to convert Hijri dates to Georgian and update both key and date
  function convertToGeorgianDate(events) {
    const result = {};

    // Iterate over each key in the JSON
    Object.keys(events).forEach((key) => {
      // Split the key into day and month
      const [day, month] = key.split("-");

      // Get the current Hijri yeaar
      const currentHijriDate = moment().format("iYYYY");

      // Convert Hijri to Georgian (Gregorian)
      const georgianDate = moment(
        `${currentHijriDate}-${month}-${day}`,
        "iYYYY-iMM-iDD",
      ).format("YYYY-MM-DD");

      // Prepare the updated event list
      result[georgianDate] = events[key].map((event: AgendaEntry) => ({
        ...event,
        date: georgianDate, // Update the date field to Georgian format
      }));
    });

    return result;
  }

  // Convert the events
  const convertedEvents = convertToGeorgianDate(events);

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Agenda
        items={convertedEvents}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        onDayPress={(day: DateData) => {
          console.log("clicked day", day);
        }}
      />
    </SafeAreaView>
  );
};

export default MyCalendar;

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: Spacing.borderRadius.base,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
