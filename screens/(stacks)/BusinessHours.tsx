import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const backIcon = require("../../assets/images/Vector2x-3.png");

interface BusinessHours {
  [key: string]: string[];
}

const days = [
  {
    name: "mon",
    value: "M",
  },
  {
    name: "tue",
    value: "T",
  },
  {
    name: "wed",
    value: "W",
  },
  {
    name: "thu",
    value: "Th",
  },
  {
    name: "fri",
    value: "F",
  },
  {
    name: "sat",
    value: "S",
  },
  {
    name: "sun",
    value: "Su",
  },
];

const timings = [
  "8:00am - 10:00am",
  "10:00am - 1:00pm",
  "1:00pm - 4:00pm",
  "4:00pm - 7:00pm",
  "7:00pm - 10:00pm",
];

const BusinessHours = ({ navigation, route }: any) => {
  var { signupDetails } = route.params;

  const businessHours: BusinessHours = {
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
    sat: [],
    sun: [],
  };

  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [week, setWeek] = useState<boolean[][]>(
    Array.from({ length: 7 }, () => Array(5).fill(false))
  );
  // const [selectedTimes, setSelectedTimes] = useState<boolean[]>(
  // Array(5).fill(false)
  // );
  const handleDayspress = (index: number): void => {
    // var newWeek = week;
    // newWeek[selectedDay] = [...selectedTimes];
    // setWeek(newWeek);
    setSelectedDay(index);
    // setSelectedTimes(week[index]);
  };

  const checkIfWeekDayUpdated = (timings: boolean[]): boolean => {
    return timings.some((value) => value === true);
  };

  const handleTimingsPress = (index: number): void => {
    // const updatedSelected = [...selectedTimes]; // Create a copy of the array
    // updatedSelected[index] = !updatedSelected[index]; // Toggle the value at the specified index
    // setSelectedTimes(updatedSelected);
    setWeek((prevWeek) => {
      const updatedWeek = prevWeek.slice();
      updatedWeek[selectedDay][index] = !prevWeek[selectedDay][index];
      return updatedWeek;
    });
    updateBusinessHours();
  };

  const updateBusinessHours = () => {
    for (let dayIndex = 0; dayIndex < days.length; dayIndex++) {
      const dayName = days[dayIndex].name;

      for (let timeIndex = 0; timeIndex < timings.length; timeIndex++) {
        if (week[dayIndex][timeIndex]) {
          businessHours[dayName].push(timings[timeIndex]);
        }
      }
    }
  };

  const handleSignupPress = () => {
    updateBusinessHours();
    console.log("week: " + week);
    console.log("businessHours: " + businessHours);
    const newDetails = {
      businessHours: businessHours,
    };
    signupDetails = { ...signupDetails, ...newDetails };
    console.log(signupDetails);
    navigation.navigate("Confirmation");
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={[styles.container, { paddingHorizontal: 25 }]}>
        <Text style={styles.appName}>FarmerEats</Text>
        <Text style={styles.page}>Signup 4 of 4</Text>
        <Text style={styles.title}>Business Hours</Text>
        <Text style={styles.inst}>
          Choose the hours your farm is open for pickups. This will allow
          customers to order deliveries.
        </Text>
        <View style={styles.daysBoxContainer}>
          {days.map((value, index) => (
            <TouchableOpacity
              activeOpacity={0.6}
              key={index}
              style={[
                styles.daysBox,
                {
                  backgroundColor:
                    selectedDay === index
                      ? "#d5715b"
                      : checkIfWeekDayUpdated(week[index])
                      ? "#cccccc"
                      : "#fff",
                },
              ]}
              onPress={() => handleDayspress(index)}
            >
              <Text
                style={[
                  styles.daysText,
                  {
                    color:
                      selectedDay === index
                        ? "#fff"
                        : checkIfWeekDayUpdated(week[index])
                        ? "#000"
                        : "#CCCCCC",
                  },
                ]}
              >
                {value.value}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.timingBoxContainer}>
          {week[selectedDay].map((value, index) => (
            <TouchableOpacity
              activeOpacity={0.6}
              key={index}
              style={[
                styles.timingBox,
                {
                  backgroundColor: value ? "#F8C569" : "#e9e9e9",
                },
              ]}
              onPress={() => handleTimingsPress(index)}
            >
              <Text style={styles.timingText}>{timings[index]}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={backIcon}
              style={{ width: 25, height: 25 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signupBtn}
            onPress={handleSignupPress}
          >
            <Text style={styles.signupBtnText}>Signup</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  appName: {
    fontSize: 24,
    fontWeight: "400",
    marginBottom: 30,
  },
  page: {
    fontSize: 16,
    fontWeight: "500",
    color: "#CCCCCC",
    marginBottom: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
    color: "#261C12",
    marginBottom: 30,
  },
  inst: {
    color: "#CCCCCC",
    fontSize: 16,
    fontWeight: "400",
    marginVertical: 30,
  },
  daysBoxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    marginBottom: 30,
  },
  daysBox: {
    height: 38,
    width: 38,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },
  daysText: {
    fontSize: 22,
    color: "#CCCCCC",
  },
  timingBoxContainer: {
    width: "100%",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    gap: 5,
  },
  timingBox: {
    width: "48%",
    height: 50,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#e9e9e9",
    justifyContent: "center",
    alignItems: "center",
  },
  timingText: {
    fontSize: 18,
    color: "#261C12",
  },
  btnContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
  },
  signupBtn: {
    width: "70%",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d5715b",
  },
  signupBtnText: {
    fontSize: 24,
    fontWeight: "500",
    color: "#fff",
  },
});

export default BusinessHours;
