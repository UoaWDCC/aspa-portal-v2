# ASPA Frontend (React)

## Introduction

**Background:**
This project is a web application designed for ASPA, aimed at providing club members with a convenient and streamlined way to sign up for events, make payments, and stay up-to-date with club activities.

**Purpose:**
The purpose of the application is to simplify the process of managing club events and registrations, as well as facilitating the payment process to offload the manul communication between club members and administrators.

**Functionality:**
The application includes several key features, including:

* User authentication: Users can sign up for an account or log in to an existing one, in order to speed up event registration process.

* Event browsing and registration: Users can browse upcoming club events, view event details, and register for events they are interested in attending.

* Payment processing: Users can make payments for events they have registered for, using a secure payment gateway.

**Modules:**
The application is broken down into several modules or components, each responsible for a specific aspect of the application's functionality. These may include:

* Authentication module: Responsible for handling user authentication and access control.

* Event module: Responsible for managing club events, including creating, editing, and deleting events.

* Registration module: Responsible for managing event registrations, including user registration and payment processing.

* User module: Responsible for managing user accounts, including user details and attendence.

**Overall approach:**
The overall approach to building the application is focused on creating a modular, component-based architecture that emphasizes flexibility, scalability, and maintainability. This involved using popular React libraries and frameworks, such as Redux, React Router, and TailWindCSS, as well as implementing best practices for code organization and testing. The user interface has been designed with usability and accessibility in mind, in order to ensure a positive user experience for all users.

## Project Structure
- frontend
	- src
		- assets
		- components
   			- reusable components should be stored here
		- routes
  			- individual web pages should be stored here

## Key Routes and Functionality

### 1. Account Sign-Up
Description and Functionality:
-   Component name: SignUp
-   Purpose: Handles user registration by collecting and validating user information.
-   Props and state:
	- State:
   		- firstName: Holds the user's first name.
		- lastName: Holds the user's last name.
		- email: Holds the user's email address.
		- password: Holds the user's chosen password.
		- confirmPassword: Holds the confirmation of the user's password.
		- passwordError: Flags if there is a password mismatch.
		- loading: Indicates whether the sign-up process is in progress.
    
	- Context:
   		- setCurrentUser: Function to set the current user in the authentication context.
		- setUid: Function to set the user ID in the authentication context. 
-   Methods
	- handleSubmit(e): Handles the form submission.
-   Dependencies
	- motion from "framer-motion" for animations.
	- axios for making HTTP requests.
	- react-icons for displaying icons.
	- react for creating React components.
	- firebase for authentication services.
	- AuthContext for managing authentication state.
	- react-router-dom for navigation.
-  API Integration
	- Describe how the frontend interacts with the backend API (e.g., Axios, Fetch).
		1. API client: Axios library is used for making HTTP requests.
		2. API endpoints:
 			POST /users: Creates a new user on the backend.
- Error handing and testing
	- Error handling patterns: 
 		- Password mismatch error is handled and displayed to the user.
		- Any other errors during the sign-up process are logged to the console.
### 2. Event Sign-Up Form
Description and Functionality:
-   Component name: Create
-   Purpose: Enables users to register for a specific event by providing personal information and selecting a payment option.
-   Props and state:
	- State:
		- event: Holds the details of the event being registered for.
		- firstName: Holds the user's first name.
		- lastName: Holds the user's last name.
		- email: Holds the user's email address.
		- paymentType: Holds the selected payment option.
		- isPending: Flags if the registration process is in progress.
		- points: Holds the user's points.
		- loading: Indicates whether the event data is still loading.
	- Context:
		- currentUser: User authentication details.
		- uid: User ID from authentication context.
-   Methods and lifecycle events
	- Methods:
		- handleSubmit(e): Handles the form submission and initiates the registration process.
	- Lifecycle Events:
		- useEffect: Fetches the event data and user points on component mount.
-   Dependencies:
	- External Libraries:
		- axios for making HTTP requests.
		- react for creating React components.
		- react-icons for displaying icons.
		- react-router-dom for navigation.
		- framer-motion for animations.
		- react-loader-spinner for displaying a loading spinner.
-  API Integration
	- Describe how the frontend interacts with the backend API (e.g., Axios, Fetch).
		- GET /events/:eventId: Fetches details of the specific event.
		- GET /users/points: Fetches the user's points.
		- POST /register: Registers the user for the event, with different logic based on the payment type.
		- PATCH /users/points/remove: Deducts points from the user when redeeming for a ticket.
		- POST /payment/create-checkout-session/:uid/:eventId: Initiates the online payment process.
- Error handing and testing
	- Error handling patterns: Any errors during the form submission or API calls are logged to the console.practices.
### 3. User Profile
- Components
	- Events
 	- GetPoints

### Events component:
Description and Functionality:
-   Component name: Events
-   Purpose: Displays a user's upcoming and past events based on their registration history.
-   Props and state:
	- State:
		- selectedTab: Indicates the currently selected tab ("upcoming" or "past").
		- userEvents: Holds the user's event data fetched from the backend.
		- filteredEvents: Displays either upcoming or past events based on the selected tab.

-   Methods and lifecycle events:
	- Methods:
		- fetchUsersEvents(): Fetches the user's events data from the backend.
		- handleTabChange(tab): Handles the tab change between "upcoming" and "past" events.
	- Lifecycle Events:
		- useEffect: Fetches the user's events data on component mount.
		- useEffect: Filters and sets the events based on the selected tab.
- Dependencies:
	- External Libraries:
		- axios for making HTTP requests.
		- react for creating React components.
		- react-icons for displaying icons.
		- react-router-dom for navigation.
		- dayjs for formatting date and time.
-  API Integration
	- Describe how the frontend interacts with the backend API (e.g., Axios, Fetch).
		1. API endpoints: 
			- GET /users/userEvents/:uid: Fetches the user's event data based on their user ID.
- Error handing and testing
	- Error handling patterns: Any errors during the fetch of user events are logged to the console.
### GetPoints component:
Description and Functionality:
-   Component name: UserPoints
-   Purpose: Displays the reward points of the authenticated user.
-   Props and state:
	- State:
		- points: Holds the user's reward points fetched from the backend.
-   Methods and lifecycle events:
	- Methods:
		- fetchUserPoints(): Fetches the user's reward points data from the backend.
	- Lifecycle Events:
		- useEffect: Fetches the user's reward points on component mount.
-   Dependencies:
	- External Libraries:
		- axios for making HTTP requests.
		- react for creating React components.
-  API Integration
	- Describe how the frontend interacts with the backend API (e.g., Axios, Fetch).
		1. API endpoints: GET /users/points: Fetches the user's reward points.
- Error handing and testing
	- Error handling patterns: Any errors during the fetch of user points are logged to the console.
### 4. Login Component
Description and Functionality:
-   Component name: Login
-   Purpose: Provides a form for users to log in using their email and password.
-   Props and state:
	- State:
		- email: Holds the user's email.
		- password: Holds the user's password.
-   Methods:
	- logIn(event): Attempts to log in the user using the provided email and password.
-   Dependencies:
	- External Libraries:
		- framer-motion for animations.
		- react for creating React components.
		- react-icons for icons.
		- firebase for authentication.
		- axios for making HTTP requests.
-  API Integration
	- Describe how the frontend interacts with the backend API (e.g., Axios, Fetch).
		1. API endpoints: POST /login: Handles user login and authentication.
- Error handing and testing
	- Error handling patterns: Any errors during the login attempt are logged to the console.

## Design Principles and Conventions

-   Naming conventions
-   Code organization and modularization
-   Component composition and reuse
-   State management strategy

## Special Cases and Custom Solutions

-   Explanation of unique or complex problem-solving approaches
-   Justification for the chosen solutions
-   Possible alternative solutions

## Styles and Theming

Describe the styling approach and theming used in the project (e.g., CSS Modules, styled-components, Material-UI).

1. Styling method: Description of the styling method.
2. Theming: Explanation of the theming and customization.

## Performance Optimizations

List and describe performance optimizations implemented in the project.

1. Lazy loading: Description of lazy loading implementation.
2. Code splitting: Explanation of code splitting approach.
3. ...

## Additional Documentation and bugs

Provide links to additional documentation for complex features or specific components, if needed.
