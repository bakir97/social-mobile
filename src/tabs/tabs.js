import Icon from "react-native-vector-icons/Entypo";
import { Navigation } from "react-native-navigation";
const Dugmad = {
  rightButtons: [
    {
      title: "Edit", // for a textual button, provide the button title (label)
      id: "edit", // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
      testID: "e2e_rules", // optional, used to locate this view in end-to-end tests
      disabled: true, // optional, used to disable the button (appears faded and doesn't interact)
      disableIconTint: true, // optional, by default the image colors are overridden and tinted to navBarButtonColor, set to true to keep the original image colors
      showAsAction: "ifRoom", // optional, Android only. Control how the button is displayed in the Toolbar. Accepted valued: 'ifRoom' (default) - Show this item as a button in an Action Bar if the system decides there is room for it. 'always' - Always show this item as a button in an Action Bar. 'withText' - When this item is in the action bar, always show it with a text label even if it also has an icon specified. 'never' - Never show this item as a button in an Action Bar.
      buttonColor: "blue", // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
      buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
      buttonFontWeight: "600" // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
    }
  ]
};
const logo = {
  navBarCustomView: "vjezba.Logo",
  navBarComponentAlignment: "fill"
};
export default () => {
  Icon.getImageSource;
  Promise.all([
    Icon.getImageSource("user", 20),
    Icon.getImageSource("home", 20),
    Icon.getImageSource("message", 20),
    Icon.getImageSource("squared-plus", 20)
  ]).then(source =>
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: "vjezba.Profil",
          label: "Profil",
          icon: source[0],
          navigatorStyle: logo,
          navigatorButtons: {
            rightButtons: [
              {
                id: "custom-button",
                component: "vjezba.Dugme" // This line loads our component as a nav bar button item
              }
            ]
          }
        },
        {
          screen: "vjezba.Objave",
          title: "Zdrav zivot",
          label: "Objave",
          navigatorStyle: logo,
          icon: source[1],
          navigatorButtons: {
            rightButtons: [
              {
                id: "custom-button",
                component: "vjezba.Dugme" // This line loads our component as a nav bar button item
              }
            ]
          }
        },
        {
          screen: "vjezba.NovaObjava",
          label: "Nova Objava",
          icon: source[3],
          navigatorStyle: logo,
          navigatorButtons: {
            rightButtons: [
              {
                id: "custom-button",
                component: "vjezba.Dugme" // This line loads our component as a nav bar button item
              }
            ]
          }
        },
        {
          screen: "vjezba.Razgovori",
          label: "Poruke",
          icon: source[2],
          navigatorStyle: logo,
          navigatorButtons: {
            rightButtons: [
              {
                id: "custom-button",
                component: "vjezba.Dugme" // This line loads our component as a nav bar button item
              }
            ]
          }
        }
      ],
      tabsStyle: {
        tabBarSelectedButtonColor: "black"
      },
      appStyle: {
        tabBarSelectedButtonColor: "black",
        forceTitlesDisplay: true,
        selectedTabFontSize: 10,
        initialTabIndex: 1
      }
    })
  );
};
