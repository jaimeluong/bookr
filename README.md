# Bookr

Bookr is a travel booking web app built entirely in the Google Apps Script cloud platform and is intended for both end-user and business admin use. Since I use Apps Script regularly at my job, I wanted to challenge myself and see if I could develop a full-stack website using my knowledge of web development frameworks and practices.

[Live version](https://script.google.com/macros/s/AKfycbwxYsTpb3W3QObNYOfYuBVjq8O6FOSQ4rAS9_yUBqY/dev)

**Unfortunately, the live version I linked above is only accessible to me since I am logged into my Google account where the project is hosted and developed...** I am working on workaround where I can publically deploy the app while having all hyperlinks throughout the website work properly, which allows for public use.

This is because Apps Script only allows you to make a web app public if it's officially deployed, from where you can allow anyone in the internet to access it through a link. There are hard-coded hyperlinks throughout the code which require this link, and the link is generated *after* you deploy, and each deployment uses *that* version of the code. Thus, I will need to make all files dynamically reference a link which I'll most likely use a hidden sheet in the database for, allowing me to specify the source URL after it's been deployed. I'll update the link above when I complete this.

## Developer thoughts

- Apps Script doesn't have any version control system, so I've been manually copy and pasting all changes to my local repository in VS Code after each atomic change which has been really frustrating. There's no indication of which files have been modified that persist after a save.

- Apps Script doesn't allow you to organize your files into folders, so all project files are in the same directory. This is not reflected on Github; the folder organization I have here only exists here and it would be ideally what the organization would look like on Apps Script if you could use directories.

- Since Apps Script doesn't have a formal back-end framework, I used the built-in doGet() function which is called when a client visits the website and makes a GET request. I used the incoming request parameters to point to different pages and return custom views, which essentially makes a router.

```
(/) points to the home/index page

(/book?propertyId=1001) points to the booking application for a specific property

(/properties) points to a view of all available properties for booking

(/bookings points) to a view of all bookings for admin to approve or deny, along with a calendar of approved stays

(/manage) points to an admin console page where you can perform CRUD operations on all properties that exist in the database
```

- A big challenge I encountered was figuring out which JavaScript code should be run on the server versus in the client-side. You have to look at logs on both the server *and* browser console for accurate debugging. Code that runs back-end to process JSON data sent from the front-end forms the backbone of client-server communication, which I think is a good concept to understand and see working.

- There's a mixture of hard-coded and dynamic variables. Designing the models and database structure was trickier than I thought at first, because having a correct database structure was important to having a functional web app. So I spent a lot of time designing how Bookr should work, which required forming a database schema in my spreadsheet. For everything that's not hard-coded, content is generated on-the-fly which allows for scalability. However, I assume that in professional codebases, code leans toward being dynamic.

- I find I enjoy working on the back-end logic over front-end presentation. Front-end is only difficult for me because I'm not very visually creative and I suck at design, which gives me less motivation to create a fun and beautiful front-end.

- I strived to create Bookr using exclusively vanilla HTML, CSS, and JavaScript which I feel I've accomplished. I was able to mock a simple web server with routing, and working on this allowed me to practice practically everything I've learned so far about coding.

- I definitely see room to refactor and optimize my code! I'm really proud of reaching a working version at least and I know this experience of building a website will be useful for the future.