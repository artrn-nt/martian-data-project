# mars-web-project

Dynamic and responsive application which fetches data from the NASA Insight API.

# What I've learnt?

- Fetching data from an API, manipulating and render them through different React components
- Working with third party library Chart.js in React
- Learned a bit more about the HTML canvas
- Crafting a nice sequenced animation for the application when it opens (I used GSAP)

# Potential improvements

The InSight API provides data for the last seven days and sometimes unfortunately some daily data remain unavailable. So if there is no data the application is unable to display them.

To prevent that lack of informations it would be a good idea to implement a sort of back-end in the app which could store data on a daily basis and therefore prevent that lack of data. I mean in that way the application would not be limited to the last seven days of data initially provided by the API. I'll probably try to implement that functionality...
