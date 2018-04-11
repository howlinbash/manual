[The Howlin Developer Guide](/index.md)



Mutt
====


## Contents


- [Cheatsheet](##Cheatsheet)
- [Limit examples](##Limit examples)
- [Index](##Index)


## Cheatsheet

l                   # filter
/                   # search
C-g                 # Clear prompt
T                   # Tag all files that match regexp
dd                  # Delete all tagged emails
$                   # Delete all emails now
c                   # change mailbox
~s                  # search subject


## Limit examples

- ~s party : messages with subject containing "party"
- ~d <2w : messages less than two weeks old. Also: year, month, week, day.
- ~t paulm : To: matches paulm (useful for sent-mail folders)
- ~O : old (i.e. unread but not new) messages. ~N is new unread. ~U is unread, i.e. both together.
- ~p : messages addressed to you (useful if your inbox is bombarded with mailing list or system report activity).
- ~p ~U : for messages to you you haven't read yet.
- . : matches everything. In effect, remove the limit.

Tagging example: deleting en masse

Here is an example that demonstrates a common sequence to delete all emails that contain the subject "work". (Don't follow along unless you actually want to do this :-)

- lwork : limit messages to work and visually inspect the results.
- Oops, you've seen some have matched on a friend's email address that contains "work". Try again with just subject match: ~s work - better!
- T : mutt uses your last expression for a tag-pattern. Since your pattern is fine, press enter.
- All messages appear with a * next to them since we're still in a limited view with an identical pattern.
- l. : remove the limit, out of curiosity. You see scattered tagged messages.
- Delete all those work emails: ;d
- Commit the changes with the $ keystroke.


## Index


" " the mail is not addressed to your address
"+" you are the only recipient of the message
"T" you're addressed in the “To:” field, but you're not the only recipient
"C" you're addressed in the “Cc:” field, but you're not the only recipient
"F" the mail that was sent by you.
"L" the mail was sent to a mailing-list you subscribe to.
