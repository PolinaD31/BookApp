# BookApp Project
A mobile app to search books, save favorites, and track weekly reading goals with charts and reminders. Built with Expo/React Native, React Navigation, Firebase, and Google Books API.
This is a project done for a Mobile development course at Haaga-Helia University of Applied Sciences.

 ### Technologies Used
 - **google Boks API** to get the book data
 - **Firebase** for data storage
 - **Firebase Authentication** for authentication
 - **Expo Notifications** for sending notifications to users based on their readong goals
 - **Expo ImagePicker** for allowing users to pick a profile picture
 - **Expo Linking** for allowing to go to book preview
 - **React-native-chart-kit** for creating a chart of users reading activity
 - **React navigation** for creating different tabs
 - **React native async storage** for user authentication persistence

### Features
- Search with Google Books API: title, authors, thumbnail support
- Book details screen: metadata, preview link, and sharing
- Toggle favorite status per book
- Reading Tracker
- Add “pages read” per date
- Weekly aggregation & line chart visualization
- Set weekly reading goal with optional local notifications
- Email/password sign up & login
- Update display name and profile picture

  ### Running the App
1. Clone and install using `npm install`
2. Create a .env in the project root with your keys
3. Create and configure the Firebase
4. Start the server with `npm start` or `npm expo start`
5. (for phone app) scan the created QR code
