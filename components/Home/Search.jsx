import { Searchbar } from "react-native-paper";

export default function Search({ searchQuery, setSearchQuery }) {
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
      style={{ width: 400, marginTop: 45, marginBottom: 20 }}
    />
  );
}
