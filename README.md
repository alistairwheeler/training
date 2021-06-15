# Simplicité Software Training Platform, Front-end Application

## Overview
This project is the Front-end application that serves the Simplicité
Software training platform.  
It is based on the Vue js framework **(Version 2.0)** and the classic
companion libraries that are used with it : **Vue Router** & **Vuex**
(see [Documentation Links](#documentation-links))  
This site is mainly here to serve as the training platform of Simplicité,
helping people to master the use of the Simplicité platform. To do so,
it displays lessons that are organized in a treeview accessible to the
user, from which he can navigate between lessons. In the future, it
will have more functionalities, mainly user skills certification
and documentation.  
The back-end for this app is a Simplicité back-end server, that contains
the data to display. Therefore, we use the Simplicite Ajax API to
communicate with the server. (see [API Documentation](https://docs.simplicite.io/4.0/jsdoc/Simplicite.html))

## Directory Structure
This project is a classic Vue application. One of the key areas of the
project is to keep it as simple as possible, because the developers working
on it will likely **NOT** be front-end developers.  
Therefore, the files are organized in a classic way for a Vue application.
### Components
The ***components*** folder contains the different Vue components of the app.
It is divided in two sub-directories : **Pages** & **UI**  
***Pages*** contains all the components that correspond to a URL of the application.
(see the **router.js** file)  
***UI*** contains components that serve UI purposes, but don't represent a whole page.
For instance, the Spinner used in the application is part of this **UI** folder.  
Components are all in Single File Components, for better readability and
code base organization

### State Management
State management is handled using [VueX](https://vuex.vuejs.org/) and
the store pattern. The idea behind the store pattern is to centralize
all the data that needs to be shared between components, so that this
data can be accessed by any component in the application without having
communication problems between components.  
The ***state*** folder contains all the store related files.  
**store.js** is the file that centralizes the store that is injected in
the Vue root instance. It's only role is to import modules from the ***modules*** subfolder.  
**mutation-types.js** is a file that exposes constants. Those constants
are the names of the mutations that can occur in the store. This method
of listing the mutations in a file is used so developers can have a quick
look of what the store is used for, by seeing the mutation names.
The ***module*** subfolder contains all the different modules of the store.
Modules are used to avoid having a massive store.js file containing
all the store related functions.

## Documentation Links
**Vue** is a javascript framework for building web applications
[Documentation here](https://vuejs.org/)  
**Vue router** is a library allowing to deal with routing in a Vue
application : [Documentation here](https://router.vuejs.org/)  
**Vuex** is the official Vue library that deals with state management of
an app : [Documentation here](https://vuex.vuejs.org/)  
**Simplicite Ajax API** is used to communicate with the back-end which
is powered by Simplicite [Documentation here](https://docs.simplicite.io/4.0/jsdoc/Simplicite.html)

