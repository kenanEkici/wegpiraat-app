# Roadhog 

### Use case 
`Roadhog serves as a mobile application for reviewing chauffeurs around the world or a specific country. Users can leave comments on certain platenumbers. The platenumbers are thus used as identifiers. However, they are not bound to an identity. The comments of each platenumber will determine the reputation of the driver. The only difference between Roadhog and a wall of shame for terrible drivers is that the identity behind a platenumber is not known to users. Users can use the platform for searching platenumbers and identifying the driver themselves, granted they are able to do this personally. This must prevent the platform from becoming a hot pool of data which hackers could possibly benefit from. However, Big Data could further utilize the data on the platform in order to improve search results and release statistics that could be of use to users of the platform or academics. `

### API
` The Roadhog API is created with the Express framework for the NodeJS platform in combination with Mongoose for the MongoDB database. Verification and confirmation mails are sent using nodemailer. Authentication is done with OAuth for Express and using Babel, ES2016 code is transpiled to ES2015. `

### App
` The application consists of standard authentication with a unique email and a password. Users can register, and must verify their email accounts after registration. Once authenticated, users can search for drivers using a platenumber. If the platenumber does not exist, users can register one and leave a comment on the platenumber. The platform does not record the person registering the platenumber. It is also not used to identify other users. Instead, it is an independent piece of data which anyone can freely add to the platform. If requested, platenumbers can be deleted by admins under certain circumstances. Users can also choose to comment anonymously. `

### Privacy & Terms of Agreement
` see api/legal/privacy.txt and api/legal/terms.txt `

### Release cycle mobile application

### Version 1.x 
> Boilerplate React Native application
> OAuth authentication and AsyncStorage (SQLite) services
> Resource services
> Platenumber searching and commenting
> Editable profile and general settings
> Standard UI theme and input validation
> Legal

### Version 2.x
> Dislike and trending function
> Advancements on profile and settings
> Social media login with OAuth
> Security and unit testing
> UI and details
> Legal updates

### Version 3.x
> BigData and data mining
> Optimization of user queries
> Migrate to bigger database
> UI
> Legal updates


