# Bookr

Bookr is a travel booking web app built entirely in the Google Apps Script cloud platform and is intended for both end-user and business admin use. Since I use Apps Script regularly at my job, I wanted to challenge myself and see if I could develop a full-stack website using my knowledge of web development frameworks and practices.

## Thoughts I have while working on this

* Apps Script has no version control system, so I've been manually copying and pasting all the changes to my local repository on Visual Studio Code after each atomic change which is really frustrating. Keeping track of which files I've touched is difficult, especially because I tend to make changes freely when I see the need to.
* Apps Script also doesn't use folders so I have a ton of files all in the same directory.
* I'm using MVC-esque principles to deliver custom views based off of URL parameters, which I figured out I can do using a simple switch statement that considers the client's GET request's event object. I realized this is the simplest way to point to different pages in the confines of Apps Script, which doesn't use an established back-end framework.