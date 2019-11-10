export default {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-speedometer",
      badge: {
        variant: "info",
        text: "NEW"
      }
    },
    {
      title: true,
      name: "Theme",
      wrapper: {
        // optional wrapper object
        element: "", // required valid HTML5 element tag
        attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: "" // optional class names space delimited list for title item ex: "text-center"
    },  
    {
      name: "Notifications",
      url: "/notifications",
      icon: "icon-bell",
      children: [
        {
          name: "Alerts",
          url: "/notifications/alerts",
          icon: "icon-bell"
        },
        {
          name: "Badges",
          url: "/notifications/badges",
          icon: "icon-bell"
        },
        {
          name: "Modals",
          url: "/notifications/modals",
          icon: "icon-bell"
        }
      ]
    },
    {
      name: "Widgets",
      url: "/widgets",
      icon: "icon-calculator",
      badge: {
        variant: "info",
        text: "NEW"
      }
    },
    {
      divider: true
    },
    {
      title: true,
      name: "Extras"
    },
    {
      name: "Pages",
      url: "/pages",
      icon: "icon-star",
      children: [
        {
          name: "Login",
          url: "/login",
          icon: "icon-star"
        },
        {
          name: "Register",
          url: "/register",
          icon: "icon-star"
        },
        {
          name: "Error 404",
          url: "/404",
          icon: "icon-star"
        },
        {
          name: "Error 500",
          url: "/500",
          icon: "icon-star"
        }
      ]
    }
  ]
};
