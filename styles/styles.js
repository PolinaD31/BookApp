import { StyleSheet } from "react-native";

export const purple = "#63509e";
export const purple_2 = "#925d9f";
export const gray = "#48444e";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  header: {
    marginBottom: 20,
    color: purple,
  },
});

export const bookDetailStyles = StyleSheet.create({
  containerBookDetail: {
    flex: 1,
    backgroundColor: "#eafff2",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "40%",
    height: "50%",
    marginTop: 8,
  },
  imageBackground: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    opacity: 0.5,
  },
  noImage: {
    flex: 1,
    width: "40%",
    height: "50%",
    marginTop: 8,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: gray,
    borderRadius: 10,
    borderWidth: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "pink",
    opacity: 0.5,
  },
});

export const readingTrackerStyles = StyleSheet.create({
  goalContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: 10,
  },
  dateContainer: {
    marginBottom: 10,
  },
  weekChangeButtonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 30,
  },
});

export const bookItemStyles = StyleSheet.create({
  title: {
    fontWeight: "600",
  },
  imageBookItem: {
    width: 100,
    height: 150,
    borderRadius: 10,
    marginTop: 7,
    marginBottom: 10,
    alignItems: "center",
  },
  noImageBookItem: {
    width: 100,
    height: 150,
    marginTop: 7,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: gray,
    borderRadius: 10,
    borderWidth: 1,
  },
  imageView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bookDetailsButtonView: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    padding: 10,
  },
  bookInfoView: {
    marginLeft: 10,
    paddingRight: 100,
  },
  iconView: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
  },
});

export const profileStyles = StyleSheet.create({
  noImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 1,
  },
  emailBox: {
    borderColor: "#63509e",
    borderRadius: 7,
    flex: 0,
    marginVertical: 20,
    padding: 10,
    backgroundColor: "#f1ecf4",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export const actionButtonsStyles = StyleSheet.create({
  shareButton: {
    color: gray,
    fontWeight: "600",
  },
});

export const additionalInfoStyles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    color: "white",
  },
  infoBox: {
    flex: 1,
    alignItems: "center",
  },
});

export const bookDetailsHeaderStyles = StyleSheet.create({
  title: "Book Details",
  headerBackTitleVisible: false,
  headerTitleStyle: {
    fontSize: 20,
  },
  headerStyle: {
    backgroundColor: "pink",
    shadowColor: "black",
    shadowRadius: 10,
  },
  headerTintColor: "black",
});

export const favoritesDetailsHeaderStyles = StyleSheet.create({
  title: "Favorites",
  headerBackTitleVisible: false,
  headerTitleStyle: {
    fontSize: 20,
  },
  headerStyle: {
    backgroundColor: "pink",
    shadowColor: "black",
    shadowRadius: 10,
  },
});
