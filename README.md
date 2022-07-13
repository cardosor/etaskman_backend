"# etaskman_backend" 

Easy Task managment backend

About The Project:
The project is an task managment system based in the kanban methodology.

Built With:
    Node.js
    Express.js
    MongoDB
    React.js
    Bootstrap


Routes:

VERB 		 | 		  PATH 		 |  	 DESCRIPTION
------------ | ------------- | -------------------
POST | /api/v1/users/ | create a user |
POST | /api/v1/users/login | login to page |
GET | /api/v1/users/:id | get user information |
PUT | /api/v1/users/:id | Update user |
DELETE | /api/v1/users/:id | delete a user |
VERB 		 | 		  PATH 		 |  	 DESCRIPTION
------------ | ------------- | -------------------
POST | /api/v1/projects/ | create a project |
GET | /api/v1/projects/user/:id | Get projects relate a user |
GET | /api/v1/projects/:id | Show a project |
PUT | /api/v1/projects/:id | Update a project |
DELETE | /api/v1/projects/:id | Delete a project |
VERB 		 | 		  PATH 		 |  	 DESCRIPTION
------------ | ------------- | -------------------
POST | /api/v1/tasks/ | Create a Task |
GET | /api/v1/tasks/:id | Create a Task |
PUT | /api/v1/tasks/:id | Create a Task |
DELETE | /api/v1/tasks/:id | Create a Task |


Future implementations:

Refacture and clean some of the code.
Create routes for paid users to work as a team.
