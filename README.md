Hangout Timer
=============

A timer extension for Google Hangouts.

### About

This is a project requested by [The Jibe](http://thejibe.com/). In short it is an extension for Google Hangouts. The extension is a timer
for conducting online debates. There is a user (judge) that controls the timer, sets the time and starts and stops it, and all other 
participants (users in Google Hangouts) are then able to view the timer.

* [Wireframes](https://moqups.com/thejibe/l9XB9zmV/p:a402b6535)
* [Google Application](https://code.google.com/apis/console/b/1/?noredirect#project:1059259466031:hangout)

### Usage

Once permissioned, just create a hangout and on the left sidebar choose "add application", click on tab "developer" and then click on 
"Hangout Timer". Other people can join the hangout and they don't need to add the extension or be a developer on the project.

Currently the extension is stored on my server, which doesn't have a valid SSL certificate. So please, first [visit my website](https://ca.ios.ba) and accept the certificate.

You can try the extension as two roles:
* [Administrator](https://plus.google.com/hangouts/_/?gid=1059259466031&gd=admin:true)
* [Participant](https://plus.google.com/hangouts/_/?gid=1059259466031)

You can provide data to the extension by padding a `gd` parameter with the following format: `gd=key1:value1;key2:value2` and so
they will be available under a variable called `params`, which is a hash.

### Demonstration

Check [this video](http://ca.ios.ba/files/the-jibe/timer/demo1.mp4), [this other video](http://ca.ios.ba/files/the-jibe/timer/demo2.mp4) and [this one also](http://ca.ios.ba/files/the-jibe/timer/demo3.mp4)!

### Credits

Caio Almeida <caiosba@gmail.com>
