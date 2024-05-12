import { useState, useEffect } from "react";
import { View, Alert, Image } from "react-native";
import { Button, Text } from "react-native-paper";
import { signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { styles } from "../styles/styles";
import * as ImagePicker from "expo-image-picker";
import { profileStyles } from "../styles/styles";

export default function Profile({ navigation }) {
    const [image, setImage] = useState(null);

    useEffect(() => {
        setImage(auth.currentUser.photoURL);
    }, []);

    const requestPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert(
                "Permission Required",
                "Please grant permission to access the photo library to pick a profile picture.",
            );
        }
        return status;
    };

    const pickImage = async () => {
        const status = await requestPermission();
        if (status === "granted") {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                updatePhoto(result.assets[0].uri);
            }
        } else {
            Alert.alert(
                "Permission Required",
                "Please grant permission to access the photo library to pick a profile picture.",
            );
        }
    };

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("Succesfully logged out!");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const updatePhoto = (url) => {
        updateProfile(auth.currentUser, {
            photoURL: url,
        })
            .then(() => {
                setImage(url);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <View style={styles.container}>
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 10,
                }}
            >
                <Text variant="titleLarge" style={{ marginBottom: 10 }}>
                    Hello and welcome to our book app!
                </Text>
                <Text variant="bodyLarge">
                    Here you can search for books, add them to favories and track your
                    reading activities! Set reading goals for yourself every week and get
                    remined about them. We are happy to welcome you in our app!
                </Text>
            </View>
            <View
                style={{ flex: 3, alignItems: "center", justifyContent: "flex-start" }}
            >
                <View style={{ flex: 0.4, alignItems: "center" }}>
                    {image ? (
                        <Image source={{ uri: image }} style={profileStyles.image} />
                    ) : (
                        <View style={profileStyles.noImage}></View>
                    )}
                    <Button mode="text" onPress={pickImage} style={{ marginTop: 5 }}>
                        Pick a Profile Picture
                    </Button>
                </View>
                <View style={profileStyles.emailBox}>
                    <Text variant="titleLarge">Email: {auth.currentUser.email}</Text>
                </View>
                <Button
                    mode="contained"
                    onPress={handleLogout}
                    style={{ marginVertical: 20 }}
                >
                    Logout
                </Button>
            </View>
        </View>
    );
}
